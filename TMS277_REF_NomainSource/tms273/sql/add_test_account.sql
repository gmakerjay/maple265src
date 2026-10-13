USE `tms`;

START TRANSACTION;

SET @test_account_name := 'test1';
SET @test_account_password := 'test1';
SET @test_account_salt := 'b47fd7d343ff2174f9eee21ce97806a5';
SET @test_account_spw := '';

INSERT INTO `account` (
  `name`,
  `password`,
  `spw`,
  `salt`,
  `gender`,
  `authority`,
  `login_stat`
) VALUES (
  @test_account_name,
  SHA2(CONCAT(@test_account_password, @test_account_salt), 512),
  @test_account_spw,
  @test_account_salt,
  0,
  0,
  0
) ON DUPLICATE KEY UPDATE
  `id` = LAST_INSERT_ID(`id`),
  `password` = VALUES(`password`),
  `spw` = COALESCE(`spw`, VALUES(`spw`)),
  `salt` = VALUES(`salt`),
  `gender` = VALUES(`gender`),
  `authority` = VALUES(`authority`),
  `login_stat` = 0;

COMMIT;

SELECT
  `id`,
  `name`,
  LENGTH(`password`) AS `password_len`,
  LENGTH(`spw`) AS `spw_len`,
  LENGTH(`salt`) AS `salt_len`,
  `gender`,
  `authority`,
  `login_stat`
FROM `account`
WHERE `name` = @test_account_name;
