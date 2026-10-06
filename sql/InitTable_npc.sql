drop table if exists npc;
create table npc (
	id int not null auto_increment,
    npcid int(11) default null,
    mapid int(11) default null,
    x int(11) default null,
    y int(11) default null,
    cy int(11) default null,
    rx0 int(11) default null,
    rx1 int(11) default null,
    fh int(11) default null,
    primary key (id)
 );
 
insert into `npc` (`npcid`, `mapid`, `x`, `y`, `cy`, `rx0`, `rx1`, `fh`) values
(2042010, 820000000, 377, 32, 55, 327, 427, 17), # Spiegelmann | Monster Carnival PQ
(9010038, 820000000, -452, -119, -115, -502, -402, 45), # Lucia | Donation Shop
(9201450, 820000000, -55, -236, -235, -105, -5, 213), # Matilda | Event Shop
(9073006, 820000000, -403, -299, -295, -453, -386, 163), # Wence | Supply Merchant
(9076100, 910002000, 632, 32, 32, 682, 582, 13), # Tory | Moon Bunny PQ
(9076110, 910002000, 925, 32, 32, 975, 875, 20), # Lakelis | First Time Together PQ
(2133000, 910002000, 400, -448, -448, 400, 400, 98), # Ellin | Forest of Poison Haze PQ
(9400401, 100000000, 2005, 514, 514, 2055, 1955, 354), # Terri | Daily Quest
(9400402, 100000000, 1950, 514, 514, 2000, 1850, 345), # Jerry's BFF Coin Shop | Daily Quest
#(9300010, 100000000, 1848, 334, 334, 1898, 1798, 140), # Mr. Moneybags
(2013000, 910002000, 470, -448, -448, 470, 470, 98); # Wonky the Fairy | Remnant of the Goddess PQ