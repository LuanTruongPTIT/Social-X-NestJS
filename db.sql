-- Provide privilege to slave user from slave database
-- Should be executed from master database since it has super admin user (postgres) 
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
ALTER USER postgres WITH SUPERUSER;