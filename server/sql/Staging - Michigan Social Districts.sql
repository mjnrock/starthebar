CREATE TABLE MichiganSocialDistrict AS
SELECT DISTINCT
	MichiganSocialDistrictStagingID AS MichiganSocialDistrictID,
    LARABusinessID,
    CurrentLGU AS PermitLocation,
    Type AS PermitType,
    Status AS PermitStatus,
    CASE
		WHEN Status = 'Issued' THEN 1
        ELSE 0
    END AS IsPermitIssued,
    CASE
		WHEN Status = 'Pending' THEN 1
        ELSE 0
    END AS IsPermitPending,
    CASE
		WHEN Status = 'Escrow' THEN 1
        ELSE 0
    END AS IsPermitEscrow
FROM
	michigansocialdistrictstaging