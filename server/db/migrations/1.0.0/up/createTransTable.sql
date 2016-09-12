begin;

create sequence trans_id_seq
start with 1
increment by 1
no minvalue
no maxvalue
cache 1;

create sequence acct_id_seq
start with 1
increment by 1
no minvalue
no maxvalue
cache 1;

create sequence cat_id_seq
start with 1
increment by 1
no minvalue
no maxvalue
cache 1;

create sequence expected_id_seq
start with 1
increment by 1
no minvalue
no maxvalue
cache 1;

create table acct (
id int primary key default nextval('acct_id_seq'),
name varchar(255) not null,
abbrev varchar(255) not null unique,
liquidable boolean default TRUE,
created date default now(),
updated date default now()
);

create type cat_type as enum ('debit', 'credit', 'savings', 'both');

-- renamed desc -> description
create table cat (
id int primary key default nextval('cat_id_seq'),
name varchar(255) not null,
abbrev varchar(255) not null unique,
description text,
type cat_type default 'debit',
created date default now(),
updated date default now()
);

-- renamed desc -> description
create table trans (
id int primary key default nextval('trans_id_seq'),
year int not null,
month int not null,
day int not null,
trans_date date not null,
description text,
amt decimal not null default 0.00,
acct_id int not null references acct(id),
cat_id int not null references cat(id),
location varchar(255),
check_num int,
cleared_date date,
created date default now(),
updated date default now()
);

create table expected (
id int primary key default nextval('expected_id_seq'),
cat_id int not null references cat(id),
amt decimal not null default 0.00,
year int not null,
month int not null,
date date not null,
created date default now(),
updated date default now()
);

alter table expected add constraint one_expected_per_month unique(cat_id, year, month);

end;
