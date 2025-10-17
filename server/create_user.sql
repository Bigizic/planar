create database my_db;

do
$$
begin
   if not exists (select from pg_roles where rolname = 'new_user') then
      create user new_user with password '123456789';
   end if;
end
$$;


grant all privileges on database my_db to new_user;
