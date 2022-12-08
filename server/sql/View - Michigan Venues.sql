DROP VIEW IF EXISTS vwMichiganVenues;
CREATE VIEW vwMichiganVenues AS
SELECT DISTINCT
	ml.LARABusinessID,
	LegalName,
	DBAName,
	Name,
	Phone,
	AddressNumber,
	Street,
	City,
	County,
	State,
	ZIP,
    CONCAT(ml.AddressNumber, " ", ml.Street, ", ", ml.City, ", ", ml.State, " ", ml.Zip) AS FullAddress,
	LicenseMask,
	LicenseTypeMask,
    msd.PermitLocation AS SocialDistrict,
    CASE
		WHEN msd.IsPermitPending = 1 THEN 2
		WHEN msd.IsPermitIssued = 1 THEN 1
        ELSE 0
    END AS IsSocialDistrict,
	IsOnPremise,
	IsOffPremise,
    IsBrewery,
    IsWinery
FROM
	MichiganLicenses ml
    LEFT JOIN MichiganSocialDistrict msd
		ON ml.LARABusinessID = msd.LARABusinessID
WHERE
	ml.IsSuspectRecord = 0
ORDER BY
	Name;