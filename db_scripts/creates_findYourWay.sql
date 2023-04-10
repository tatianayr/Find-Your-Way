create table season (
    sea_id SERIAL NOT NULL CONSTRAINT sea_pkey PRIMARY KEY,
    sea_name VARCHAR(100) NOT NULL UNIQUE
);

create table cost (
    cost_id SERIAL NOT NULL CONSTRAINT cost_pkey PRIMARY KEY,
    cost_name VARCHAR(100) NOT NULL UNIQUE
);

create table history (
    hist_id SERIAL NOT NULL CONSTRAINT hist_pkey PRIMARY KEY,
    hist_name VARCHAR(100) NOT NULL UNIQUE
);

create table activity (
    act_id SERIAL NOT NULL CONSTRAINT act_pkey PRIMARY KEY,
    act_name VARCHAR(100) NOT NULL UNIQUE
);
    

create table cities (
	cit_id SERIAL NOT NULL CONSTRAINT cit_pkey PRIMARY KEY,
	cit_name VARCHAR(100) NOT NULL UNIQUE,
	cit_hist_id int not null,
	cit_act_id int not null,
    cit_cost_id int not null,
    cit_sea_id int not null,

    CONSTRAINT cit_fk_hist FOREIGN KEY (cit_hist_id) REFERENCES history(hist_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT cit_fk_act FOREIGN KEY (cit_act_id) REFERENCES activity(act_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT cit_fk_cost FOREIGN KEY (cit_cost_id) REFERENCES cost(cost_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT cit_fk_sea FOREIGN KEY (cit_sea_id) REFERENCES season(sea_id)
    ON DELETE CASCADE ON UPDATE CASCADE

    
);




