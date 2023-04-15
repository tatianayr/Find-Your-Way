-- Create the database with the name: shopingList
-- Then run the create table bellow

create table appuser (
    usr_id serial,
    usr_name varchar(60) not null,
    usr_pass varchar(200) not null, 
    usr_token varchar(200),
    primary key (usr_id));




create table cities (
	cit_id SERIAL,
	cit_name VARCHAR(100) NOT NULL UNIQUE ,
    primary key(cit_id)  
);
create table activity (
    act_id SERIAL,
    act_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(act_id)  
);
create table history (
    hist_id SERIAL,
    hist_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(hist_id)  
);
create table cost (
    cost_id SERIAL,
    cost_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(cost_id)  
);

create table season (
    sea_id SERIAL,
    sea_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(sea_id)  
);



create table transportation (
    tran_id SERIAL,
    tran_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(tran_id)  
);
create table walkability (
    wal_id SERIAL,
    wal_name VARCHAR(100) NOT NULL UNIQUE,
    primary key(wal_id)  
);
create table sc(
    sc_cit_id int not null,
    sc_sea_id int not null,
    CONSTRAINT sc_fk_cit FOREIGN KEY (sc_cit_id) REFERENCES cities(cit_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT sc_fk_sea FOREIGN KEY (sc_sea_id) REFERENCES season(sea_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

create table ch(
    ch_cit_id int not null,
    ch_hist_id int not null,
    CONSTRAINT ch_fk_cit FOREIGN KEY (ch_cit_id) REFERENCES cities(cit_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ch_fk_hist FOREIGN KEY (ch_hist_id) REFERENCES history(hist_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

create table ca(
    ca_cit_id int not null,
    ca_act_id int not null,
    CONSTRAINT ca_fk_cit FOREIGN KEY (ca_cit_id) REFERENCES cities(cit_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ca_fk_act FOREIGN KEY (ca_act_id) REFERENCES activity(act_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

create table cw(
    cw_cit_id int not null,
    cw_wal_id int not null,
    CONSTRAINT cw_fk_cit FOREIGN KEY (cw_cit_id) REFERENCES cities(cit_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT cw_fk_wal FOREIGN KEY (cw_wal_id) REFERENCES walkability(wal_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

create table ct(
    ct_cit_id int not null,
    ct_tran_id int not null,
    CONSTRAINT ct_fk_cit FOREIGN KEY (ct_cit_id) REFERENCES cities(cit_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ct_fk_tran FOREIGN KEY (ct_tran_id) REFERENCES transportation(tran_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);


    







