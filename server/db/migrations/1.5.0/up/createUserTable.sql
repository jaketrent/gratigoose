begin;

create table auth_user (
username varchar(255) primary key,
password_hash varchar(255) not null,
created date default now(),
updated date default now()
);


end;
