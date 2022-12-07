DROP TABLE IF EXISTS michiganlicenses;
CREATE Table michiganlicenses AS
WITH MichiganLicenseBase AS (
	SELECT
		MichiganLicensesStagingID,
		LARABusinessID,
		LegalName,
		DBAName,
		COALESCE(DBAName, LegalName) AS Name,
		Phone,
		SPLIT_STRING(" ", NumberAddress, 1) AS AddressNumber,
		LTRIM(RTRIM(SUBSTRING(NumberAddress, POSITION(" " IN NumberAddress)))) AS Street,
		LTRIM(RTRIM(City)) AS City,
		County,
		SUBSTRING(StateZip, 2, 2) AS State,
		SUBSTRING(StateZip, 5, 5) AS ZIP,
		CurrentLocation,
		IssuingLocation,
		LicenseNumber,
		LicenseGroup,
		LicenseType,
		LicenseSubtype,
		LicenseMask,
		IsStatuteOwnershipTransferable,
		IsStatuteLocationTransferable,
		IsOnPremise,
		IsOffPremise
	FROM (
		SELECT
			MichiganLicensesStagingID,
			ls.LARABusinessID,
			CASE
				WHEN LENGTH(LegalName) < 1 THEN NULL
				ELSE LegalName
			END AS LegalName,
			CASE
				WHEN LENGTH(DBAName) < 1 THEN NULL
				ELSE DBAName
			END AS DBAName,
			CASE
				WHEN LENGTH(Phone) < 1 THEN NULL
				WHEN NOT POSITION("(" IN Phone) THEN CONCAT("(", SUBSTRING(Phone, 1, 3), ") ", SUBSTRING(Phone, 4, 3), "-", SUBSTRING(Phone, 7, 4))
				ELSE Phone
			END AS Phone,
			UPPER(SPLIT_STRING(",", Address, 1)) AS NumberAddress,
			UPPER(SPLIT_STRING(",", Address, 2)) AS City,
			UPPER(County) AS County,
			UPPER(SPLIT_STRING(",", Address, 3)) AS StateZip,
			CASE
				WHEN LENGTH(CurrentLGU) < 1 THEN NULL
				ELSE CurrentLGU
			END AS CurrentLocation,
			CASE
				WHEN LENGTH(IssuingLGU) < 1 THEN NULL
				ELSE IssuingLGU
			END AS IssuingLocation,
			LicenseNumber,
			LicenseGroup,
			LicenseType,
			CASE
				WHEN LicenseSubtype = 'N/A' THEN NULL
				WHEN LENGTH(LicenseSubtype) < 1 THEN NULL
				ELSE LicenseSubtype
			END AS LicenseSubtype,
			LicenseMask,
			CASE
				WHEN StatuteOwnershipTransferable = 'Y' OR StatuteOwnershipTransferable = 'YES' THEN 1
				WHEN StatuteOwnershipTransferable = 'N' OR StatuteOwnershipTransferable = 'NO' THEN 0
				ELSE NULL
			END AS IsStatuteOwnershipTransferable,
			CASE
				WHEN StatuteLocationTransferable = 'Y' OR StatuteLocationTransferable = 'YES' THEN 1
				WHEN StatuteLocationTransferable = 'N' OR StatuteLocationTransferable = 'NO' THEN 0
				ELSE NULL
			END AS IsStatuteLocationTransferable,
			CASE
				WHEN LicenseMask & 2 << 1 THEN 1
				ELSE 0
			END AS IsOnPremise,
			CASE
				WHEN LicenseMask & 2 << 2 THEN 1
				ELSE 0
			END AS IsOffPremise
		FROM
			(
				SELECT
					*,
					UPPERCASE_WORDS(LOWER(AccountName)) AS LegalName,
					UPPERCASE_WORDS(LOWER(DBA)) AS DBAName
				FROM
					starthebar.michiganlicensesstaging
			) ls
			INNER JOIN (
				SELECT
					LARABusinessID,
					SUM(DISTINCT CASE
						WHEN LicenseGroup = 'Retail - On Premises' THEN 2 << 1
						WHEN LicenseGroup = 'Retail - Off Premises' THEN 2 << 2
						WHEN LicenseGroup = 'Retail - Off Premise' THEN 2 << 2
						WHEN LicenseGroup = 'Non-Profit' THEN 2 << 3
						WHEN LicenseGroup = 'Manufacturer' THEN 2 << 4
						WHEN LicenseGroup = 'Wholesale' THEN 2 << 5
					END) AS LicenseMask
				FROM
					starthebar.michiganlicensesstaging
				GROUP BY
					LARABusinessID
			) lsm
				ON ls.LARABusinessID = lsm.LARABusinessID
	) sq
)
SELECT
	*,
    CASE
		WHEN LENGTH(Street) < 1 THEN 1
		WHEN LENGTH(State) < 1 THEN 1
        ELSE 0
    END AS IsSuspectRecord
FROM
	MichiganLicenseBase
ORDER BY
	MichiganLicensesStagingID