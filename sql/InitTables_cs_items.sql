drop table if exists cs_items;
create table cs_items (
	id int not null auto_increment,
    itemID int not null,
    stock int default 1,
    shopItemFlag int default 0,
    idk1 int default 0,
    idk2 int default 0,
    oldPrice int default 0,
    newPrice int default 0,
    idkTime1 datetime(3),
    saleFromFT datetime(3),
    idkTime3 datetime(3),
    saleToFT datetime(3),
    idk3 int default 0,
    bundleQuantity int default 0,
    availableDays int default 0,
    buyableWithMaplePoints smallint default 1,
    buyableWithCredit smallint default 1,
    buyableWithPrepaid smallint default 1,
    likable smallint default 1,
    meso smallint default 0,
    favoritable smallint default 1,
    gender int default 2,
    likes int default 0,
    requiredLevel int default 0,
    idk10 varchar(255),
    idk11 int default 0,
    idk13 int default 0,
    idk14 int default 0,
    category varchar(255),
    primary key (id)
);
# Discount
insert into `cs_items` (`itemID`, `oldPrice`, `newPrice`, `availableDays`, `category`) values
('5040004', '5500', '3850', 1, 'Teleport Rocks'), /* Hyper Teleport Rock */
('5040004', '25000', '17500', 7, 'Teleport Rocks'), /* Hyper Teleport Rock */
('5133001', '0', '500000', 7, 'Protection'), /* Buff Freezer */
('5130000', '0', '10000', 7, 'Protection'), /* Safety Charm */
('5450007', '0', '9000', 7, 'Item Stores'), /* [7-Day] Miu Miu the Traveling Merchant */
('5450009', '0', '9000', 7, 'Item Stores'), /* [7-Day]  Mr. Wang's Storage Wagon */
('5550001', '0', '10000', 7, 'Inventory slots'), /* Add Pendant Slots: 7 Days */
('5450006', '0', '1500', 1, 'Item Stores'), /* Traveling Merchant (1-day) */
('5450008', '0', '1500', 1, 'Item Stores'), /* Portable Storage (1-day) */
('5550003', '0', '80000', 90, 'Inventory slots'), /* Add Pendant Slots: 90 Days */
('5061000', '0', '4000', 7, 'Special items'), /* Item Guard : 7 Days */
('5000000', '0', '33400', 90, 'Pets'), /* Brown Kitty */
('5000001', '0', '31400', 90, 'Pets'), /* Brown Puppy */
('5000002', '0', '19400', 90, 'Pets'), /* Pink Bunny */
('5000003', '0', '13900', 90, 'Pets'), /* Mini Kargo */
('5000004', '0', '10700', 90, 'Pets'), /* Black Kitty */
('5000005', '0', '33800', 90, 'Pets'), /* White Bunny */
('5000006', '0', '25100', 90, 'Pets'), /* Husky */
('5000007', '0', '13200', 90, 'Pets'), /* Black Pig */
('5000008', '0', '27300', 90, 'Pets'), /* Panda */
('5000009', '0', '15300', 90, 'Pets'), /* Dino Boy */
('5000010', '0', '12400', 90, 'Pets'), /* Dino Girl */
('5000011', '0', '29500', 90, 'Pets'), /* Monkey */
('5000012', '0', '9000', 90, 'Pets'), /* White Tiger */
('5000018', '0', '13000', 90, 'Pets'), /* Husky */
('5000020', '0', '11800', 90, 'Pets'), /* Mini Yeti */
('5000021', '0', '27200', 90, 'Pets'), /* Monkey */
('5000022', '0', '8000', 90, 'Pets'), /* Turkey */
('5000024', '0', '27100', 90, 'Pets'), /* Jr. Balrog */
('5000025', '0', '29900', 90, 'Pets'), /* Golden Pig */
('5000026', '0', '21400', 90, 'Pets'), /* Sun Wu Kong */
('5000028', '0', '13500', 90, 'Pets'), /* Dragon */
('5000042', '0', '19100', 90, 'Pets'), /* Kino */
('5000044', '0', '34100', 90, 'Pets'); /* Orange Tiger */

insert into `cs_items` (`itemID`, `newPrice`, `category`) values
('5010000', '9300', 'Effect'), /* Sunny Day */
('5010001', '12000', 'Effect'), /* Moon & the Stars */
('5010002', '8300', 'Effect'), /* Colorful Rainbow */
('5010003', '12400', 'Effect'), /* Little Devil */
('5010004', '7700', 'Effect'), /* Underwater */
('5010005', '9800', 'Effect'), /* Looking for Love */
('5010006', '9300', 'Effect'), /* Baby Angel */
('5010007', '11500', 'Effect'), /* Fugitive */
('5010008', '9700', 'Effect'), /* Mr. Jackpot */
('5010009', '9600', 'Effect'), /* Martial Effect */
('5010010', '8100', 'Effect'), /* Play with Me */
('5010011', '12000', 'Effect'), /* Loner */
('5010012', '7600', 'Effect'), /* Equalizer */
('5010013', '11900', 'Effect'), /* Fireworks */
('5010014', '12100', 'Effect'), /* Stormy Cloud */
('5010016', '8500', 'Effect'), /* Siren */
('5010017', '8500', 'Effect'), /* Twinkling Star */
('5010018', '10500', 'Effect'), /* Smile */
('5010019', '8600', 'Effect'), /* Heart */
('5010020', '11500', 'Effect'), /* Go! Korea! */
('5010021', '8600', 'Effect'), /* Skeleton of Horror */
('5010022', '9000', 'Effect'), /* Star Trail */
('5010023', '9400', 'Effect'), /* Pumping Heart */
('5010024', '9800', 'Effect'), /* The Flocking Ducks */
('5010025', '8000', 'Effect'), /* Silent Spectre */
('5010026', '7700', 'Effect'), /* Bat Manager Effect */
('5010027', '11000', 'Effect'), /* Hot Head */
('5010028', '10100', 'Effect'), /* Indigo Flames */
('5010029', '7800', 'Effect'), /* Demonfyre */
('5010030', '8600', 'Effect'), /* Nuclear Fire */
('5010031', '10400', 'Effect'), /* My Boyfriend */
('5010032', '7300', 'Effect'), /* My Girlfriend */
('5010033', '12300', 'Effect'), /* Sheer Fear */
('5010034', '11100', 'Effect'), /* Christmas Tree */
('5010035', '11500', 'Effect'), /* Snowman */
('5010038', '12000', 'Effect'), /* Shower Power */
('5010039', '7800', 'Effect'), /* Spotlight */
('5010042', '8200', 'Effect'), /* Busy Bee */
('5010043', '11300', 'Effect'), /* Eyelighter */
('5010044', '8400', 'Effect'), /* Shadow Style */
('5010045', '10500', 'Effect'), /* Struck by Lightning */
('5010046', '8600', 'Effect'), /* Maple Champion */
('5010048', '10000', 'Effect'), /* Maple Champion */
('5010049', '8000', 'Effect'), /* Maple Champion */
('5010051', '7500', 'Effect'), /* O Maplemas Tree */
('5010052', '12200', 'Effect'), /* Santa Sled */
('5010053', '10700', 'Effect'), /* Mistletoe */
('5010054', '11600', 'Effect'), /* Jingling Santa */
('5010055', '10800', 'Effect'), /* UFO */
('5010056', '9500', 'Effect'), /* Garden Trail */
('5010057', '12300', 'Effect'), /* Flower Fairy */
('5010059', '8800', 'Effect'), /* Trail of Darkness Effect */
('5010060', '7900', 'Effect'), /* Happy Winter Effect */
('5010061', '12100', 'Effect'), /* Ace of Hearts */
('5010064', '10900', 'Effect'), /* Rock Band Effect */
('5010065', '11700', 'Effect'), /* Scoreboard Effect */
('5010066', '11700', 'Effect'), /* Disco Effect */
('5010074', '10600', 'Effect'), /* Mr. Popular */
('5010073', '7600', 'Effect'), /* Miss Popular */
('5021000', '30000', 'Special'), /* Water Balloon */
('5021001', '30000', 'Special'), /* Paper Plane */
('5021002', '30000', 'Special'), /* Energy Ball */
('5021003', '30000', 'Special'), /* Super Star */
('5021004', '30000', 'Special'), /* Winged Baseball */
('5021005', '30000', 'Special'), /* Football */
('5021006', '30000', 'Special'), /* Chalkboard Eraser */
('5021007', '30000', 'Special'), /* Shooting Hearts */
('5021008', '30000', 'Special'), /* Throwing Teddy */
('5021009', '30000', 'Special'), /* Throwing Pepe */
('5021010', '30000', 'Special'), /* Mr. Puff Throwing Star */
('5021011', '30000', 'Special'), /* Skull Striker */
('5021012', '30000', 'Special'), /* Pumpkin Bomb */
('5021013', '30000', 'Special'), /* Pirate Bomb */
('5021014', '30000', 'Special'), /* Poo Stars */
('5021015', '30000', 'Special'), /* Egg Throwing Star */
('5021016', '30000', 'Special'), /* Devilball */
('5021017', '30000', 'Special'), /* Dragon Disc */
('5021019', '30000', 'Special'), /* Shooting Star Medal */
('5021020', '30000', 'Special'), /* Throwing Boomers */
('5021021', '30000', 'Special'), /* Exploding Sheep */
('5021023', '30000', 'Special'), /* Stirge Throwing Star */
('5021024', '30000', 'Special'), /* Throwing Eggs Weapon */
('5021022', '30000', 'Special'), /* Plate Throwing Star */
('5021025', '30000', 'Special'), /* Charm of the Undead */
('5021026', '30000', 'Special'), /* Gift Box Throwing Stars */
('5050000', '40000', 'SP/AP modifications'), /* AP Reset */
('5051001', '10000', 'SP/AP modifications'), /* SP Reset Scroll */
('5050100', '60000', 'SP/AP modifications'), /* AP Reset Scroll */
('5050015', '10000', 'SP/AP modifications'), /* Beast Tamer Animal SP Reset Scroll */
('5060000', '12000', 'Special items'), /* Item Tag */
('5060002', '30000', 'Special items'), /* Incubator */
('5061001', '10000', 'Special items'), /* Item Guard : 30 Days */
('5062800', '42000', 'Special items'), /* Miracle Circulator */
('5680474', '200000', 'Special items'), /* Bonus Potential Scroll 60% Coupon */
('5700000', '12000', 'Special items'), /* Android Naming Coupon */
('5750001', '10000', 'Special items'), /* Nebulite Diffuser */
('5680015', '40000', 'Special items'), /* Fatigue Reset Drink */
('5062400', '500000', 'Special items'), /* Fusion Anvil */
('5062402', '500000', 'Special items'), /* Medal Fusion Anvil */
('5530334', '65000', 'Special items'), /* Premium Fusion Ticket Exchange Coupon */
('5062200', '10000', 'Protection'), /* Inner Ability B-Rank Lock */
('5062201', '20000', 'Protection'), /* Inner Ability A-Rank Lock */
('5070000', '2500', 'Megaphones'), /* Cheap Megaphone */
('5071000', '2500', 'Megaphones'), /* Megaphone */
('5072000', '5500', 'Megaphones'), /* Super Megaphone */
('5076000', '5500', 'Megaphones'), /* Item Megaphone */
('5077000', '5500', 'Megaphones'), /* Triple Megaphone */
('5120003', '23100', 'Weather Effects'), /* Snowflakes */
('5120004', '20400', 'Weather Effects'), /* Sprinkled Presents */
('5120005', '8400', 'Weather Effects'), /* Sprinkled Chocolate */
('5120006', '11600', 'Weather Effects'), /* Sprinkled Flower Petals */
('5120007', '17300', 'Weather Effects'), /* Sprinkled Candy */
('5120008', '10600', 'Weather Effects'), /* Sprinkled Maple Leaves */
('5120009', '24300', 'Weather Effects'), /* Fireworks */
('5120010', '18000', 'Weather Effects'), /* Sprinkled Coke */
('5120011', '14800', 'Weather Effects'), /* Spirit Haunt */
('5120012', '16900', 'Weather Effects'), /* Holiday Sock */
('5120014', '23300', 'Weather Effects'), /* Christmas Socks */
('5120015', '15900', 'Weather Effects'), /* Chinese Lantern Firecrackers */
('5120027', '15000', 'Weather Effects'), /* Spaceship */
('5120028', '18400', 'Weather Effects'), /* Raining Cats & Dogs */
('5120030', '24000', 'Weather Effects'), /* Witch Tower */
('5120034', '18400', 'Weather Effects'), /* Cloudy Meatballs */
('5120036', '14900', 'Weather Effects'), /* 5th Anniversary Confetti */
('5120043', '23500', 'Weather Effects'), /* Empress Thought Bubble */
('5120049', '14100', 'Weather Effects'), /* Commitment Ceremony */
('5120079', '24500', 'Weather Effects'), /* Halloween */
('5121000', '14700', 'Weather Effects'), /* Fighting Spirit */
('5121001', '13000', 'Weather Effects'), /* Korean Soccer Chant */
('5121002', '17400', 'Weather Effects'), /* Soccer Fever */
('5121003', '13100', 'Weather Effects'), /* Chicken Soup */
('5121004', '8500', 'Weather Effects'), /* Song Pyun */
('5121005', '22800', 'Weather Effects'), /* Han Gwa */
('5121006', '12600', 'Weather Effects'), /* Flock of Witches */
('5121007', '8100', 'Weather Effects'), /* Tree Decor */
('5121008', '9700', 'Weather Effects'), /* Happy Birthday */
('5121009', '23400', 'Weather Effects'), /* Petite Rose */
('5121010', '18400', 'Weather Effects'), /* Floral Fest */
('5121014', '14500', 'Weather Effects'), /* Snowing Fishbread */
('5121015', '19900', 'Weather Effects'), /* Snowy Snowman */
('5121016', '24800', 'Weather Effects'), /* Heart-shaped Chocolate Box */
('5121017', '17700', 'Weather Effects'), /* Water Splash */
('5121019', '8400', 'Weather Effects'), /* Winter Knit Fest */
('5121020', '20800', 'Weather Effects'), /* Happy New Year */
('5121025', '8100', 'Weather Effects'), /* 2010 Cheer for Victory */
('5121026', '8900', 'Weather Effects'), /* Rookie Floral Fest */
('5121028', '9700', 'Weather Effects'), /* Love Rain */
('5121030', '19100', 'Weather Effects'), /* Merry Happy Halloween! */
('5121031', '22800', 'Weather Effects'), /* New Year's Festivities */
('5121032', '22600', 'Weather Effects'), /* Petite Rose */
('5121033', '8100', 'Weather Effects'), /* Shooting Star Candy */
('5121036', '17400', 'Weather Effects'), /* North Pole Neighbors */
('5122000', '19200', 'Weather Effects'), /* Hearty Party Bear */
('5122015', '14700', 'Weather Effects'), /* Winter Kingdom Atmospheric Effect */
('5120130', '8000', 'Weather Effects'), /* Sweet N' Sour BBQ Pork World */
('5121040', '12600', 'Weather Effects'), /* Administrator's Apologies */
('5121041', '14800', 'Weather Effects'), /* Blessing of the Guild */
('5121044', '14200', 'Weather Effects'), /* Go Offense! */
('5121047', '24900', 'Weather Effects'), /* Star Planet Atmospheric Effect */
('5121048', '21400', 'Weather Effects'), /* Star Planet Atmospheric Effect 2 */
('5121054', '15100', 'Weather Effects'), /* Reward Atmospheric Effect */
('5121055', '9400', 'Weather Effects'), /* Thank You Maple Atmospheric Effect */
('5121056', '17300', 'Weather Effects'), /* Heroes of Maple Premium PC Cafe Atmospheric Effect */
('5121057', '15300', 'Weather Effects'), /* Masarayu's Gift Atmospheric Effect */
('5120161', '23900', 'Weather Effects'), /* Chief Priest (Boss) */
('5160000', '8300', 'Facial Expressions'), /* Queasy */
('5160001', '3600', 'Facial Expressions'), /* Panicky */
('5160002', '4800', 'Facial Expressions'), /* Sweetness */
('5160003', '7600', 'Facial Expressions'), /* Smoochies */
('5160004', '4700', 'Facial Expressions'), /* Wink */
('5160005', '9000', 'Facial Expressions'), /* Ouch */
('5160006', '9500', 'Facial Expressions'), /* Sparkling Eyes */
('5160007', '5700', 'Facial Expressions'), /* Flaming */
('5160008', '9400', 'Facial Expressions'), /* Ray */
('5160009', '6600', 'Facial Expressions'), /* Goo Goo */
('5160010', '8200', 'Facial Expressions'), /* Whoa Whoa */
('5160011', '8600', 'Facial Expressions'), /* Constant Sigh */
('5160012', '3600', 'Facial Expressions'), /* Drool */
('5160013', '3800', 'Facial Expressions'), /* Dragon Breath */
('5160014', '4600', 'Facial Expressions'), /* Bleh */
('5160015', '3400', 'Facial Expressions'), /* Dizzy */
('5160016', '6200', 'Facial Expressions'), /* Awkward */
('5160017', '8500', 'Facial Expressions'), /* Villainous */
('5160019', '9100', 'Facial Expressions'), /* Queasy */
('5160020', '8800', 'Facial Expressions'), /* Panicky */
('5160021', '8800', 'Facial Expressions'), /* Sweetness */
('5160022', '6200', 'Facial Expressions'), /* Smoochies */
('5160023', '9500', 'Facial Expressions'), /* Wink */
('5160024', '7300', 'Facial Expressions'), /* Ouch */
('5160025', '4000', 'Facial Expressions'), /* Sparkling Eyes */
('5160026', '5700', 'Facial Expressions'), /* Flaming */
('5160027', '4000', 'Facial Expressions'), /* Ray */
('5160028', '9500', 'Facial Expressions'), /* Goo Goo */
('5160029', '8700', 'Facial Expressions'), /* Whoa Whoa */
('5160030', '7900', 'Facial Expressions'), /* Constant Sigh */
('5160031', '6100', 'Facial Expressions'), /* Drool */
('5160032', '3700', 'Facial Expressions'), /* Dragon Breath */
('5160033', '3600', 'Facial Expressions'), /* Bleh */
('5160034', '9400', 'Facial Expressions'), /* Nosebleed */
('5160035', '5900', 'Facial Expressions'), /* Awesome */
('5160036', '6400', 'Facial Expressions'), /* Troll */
('5222006', '70000', 'Surprise Boxes'), /* Surprise Style Box */
('5250500', '20000', 'Wedding'), /* House Wedding Ticket */
('5250501', '20000', 'Wedding'), /* House Wedding Ticket */
('5250502', '20000', 'Wedding'), /* Las Vegas Wedding Ticket */
('5250503', '20000', 'Wedding'), /* Japan Wedding Ticket */
('5250504', '20000', 'Wedding'), /* China Wedding Ticket */
('5251000', '5000', 'Wedding'), /* Wedding Ticket (Cathedral) */
('5251003', '5000', 'Wedding'), /* Premium Wedding Ticket (Cathedral) */
('5251001', '5000', 'Wedding'), /* Wedding Ticket (Chapel) */
('5251002', '5000', 'Wedding'), /* Premium Wedding Ticket (Chapel) */
('5251100', '7000', 'Wedding'), /* Wedding Invitation Ticket */
('5300000', '20000', 'Transformations'), /* Fungus Scroll */
('5300001', '20000', 'Transformations'), /* Oinker Delight */
('5300002', '20000', 'Transformations'), /* Zeta Nightmare */
('5430000', '20000', 'Inventory slots'), /* Extra Character Slot Coupon */
('5450004', '35000', 'Item Stores'), /* Traveling Merchant (30-day) */
('5450005', '35000', 'Item Stores'), /* Portable Storage (30-day) */
('5220000', '5000', 'Gachapon Tickets'), /* Gachapon Ticket */
('5220097', '25000', 'Gachapon Tickets'), /* Chair Gachapon Ticket */
('5220098', '7500', 'Gachapon Tickets'), /* Nebulite Gachapon Ticket */
('5451000', '17500', 'Gachapon Tickets'), /* Remote Gachapon Ticket */
('5520000', '40000', 'Trade'), /* Scissors of Karma */
('5520001', '80000', 'Trade'), /* Platinum Scissors of Karma  */
('5570000', '50000', 'Upgrade Slots'), /* Vicious' Hammer */
('5170000', '8000', 'Pet Use'), /* Pet Name Tag */
('5180000', '8000', 'Pet Use'), /* Water of Life */
('5380000', '8000', 'Pet Use'), /* The Rock of Evolution */
('5460000', '8000', 'Pet Use'), /* Pet Snack */
('5689000', '8000', 'Pet Use'), /* Premium Water of Life */
('5781000', '7700', 'Pet Use'), /* Bean Dye Coupon */
('5781001', '7700', 'Pet Use'), /* Pink Bean Dye Coupon */
('5781002', '7700', 'Pet Use'), /* Demon Pet Dye Coupon */
('5781004', '7700', 'Pet Use'), /* Roo-bot Paint Coupon */
('5781006', '7700', 'Pet Use'), /* Dillo Dye Coupon */
('5781007', '7700', 'Pet Use'), /* Chestnut Dye Coupon */
('5781008', '7700', 'Pet Use'), /* Candle Pet Dye Coupon */
('5781009', '7700', 'Pet Use'), /* Creampuff Pet Dye Coupon */
('5781010', '7700', 'Pet Use'), /* Pengy Pet Dye Coupon */
('5781011', '7700', 'Pet Use'), /* Chihuahua Dye Coupon */
('5781013', '7700', 'Pet Use'), /* Chameleon Pet Dye Coupon */
('5781014', '7700', 'Pet Use'), /* Chubmunk Pet Dye Coupon */
('1802303', '12200', 'Pet Appearance'), /* Clown Dress */
('1802302', '24400', 'Pet Appearance'), /* Pet-o-Lantern */
('1802301', '19200', 'Pet Appearance'), /* Ghosty */
('1802300', '24000', 'Pet Appearance'), /* Bare Bones */
('1802331', '23400', 'Pet Appearance'), /* Rabbit Ears */
('1802330', '24000', 'Pet Appearance'), /* Dragon Egg Shell */
('1802329', '20700', 'Pet Appearance'), /* Alien's Pet */
('1802328', '22700', 'Pet Appearance'), /* Baby Tiger Wings */
('1802335', '13700', 'Pet Appearance'), /* Blue Birdy */
('1802334', '18400', 'Pet Appearance'), /* Fish */
('1802333', '22100', 'Pet Appearance'), /* B-Day Candle */
('1802332', '15900', 'Pet Appearance'), /* Pink Oxygen Tank */
('1802323', '15500', 'Pet Appearance'), /* Gas Mask */
('1802322', '20100', 'Pet Appearance'), /* Chestnut Cap */
('1802321', '16300', 'Pet Appearance'), /* Jr. Reaper Sign (I love pie) */
('1802320', '17900', 'Pet Appearance'), /* Jr. Reaper Sign (<--Noob) */
('1802327', '23200', 'Pet Appearance'), /* Starry Stereo Headset */
('1802326', '21700', 'Pet Appearance'), /* Kino's Green Mushroom Hat */
('1802325', '12400', 'Pet Appearance'), /* Scuba Mask */
('1802324', '21600', 'Pet Appearance'), /* Jail Bird Pet Costume */
('1802315', '16500', 'Pet Appearance'), /* Dragon Armor */
('1802314', '16600', 'Pet Appearance'), /* Baby Turkey Carriage */
('1802313', '15700', 'Pet Appearance'), /* Cute Beggar Overall */
('1802312', '17500', 'Pet Appearance'), /* Guitar  */
('1802319', '23100', 'Pet Appearance'), /* Snowman Gear */
('1802318', '23200', 'Pet Appearance'), /* Jr. Reaper Sign (cc plz) */
('1802317', '22500', 'Pet Appearance'), /* Jr. Reaper Sign (I'm with stoopid) */
('1802316', '13400', 'Pet Appearance'), /* Porcupine Sunglasses */
('1802307', '12600', 'Pet Appearance'), /* Pelvis Hair */
('1802306', '15500', 'Pet Appearance'), /* Oinker Suit */
('1802305', '23700', 'Pet Appearance'), /* White Tiger Suit */
('1802304', '15500', 'Pet Appearance'), /* Penguin Earmuff Set */
('1802311', '21700', 'Pet Appearance'), /* White Angel */
('1802310', '20600', 'Pet Appearance'), /* Cowboy Kargo */
('1802309', '15300', 'Pet Appearance'), /* Crimson Mask */
('1802308', '13500', 'Pet Appearance'), /* Prince Pepe */
('1802367', '16500', 'Pet Appearance'), /* Gingerbready Bow Tie */
('1802366', '19400', 'Pet Appearance'), /* Puffram's Golden Horn */
('1802365', '14600', 'Pet Appearance'), /* Harp Seal Hat */
('1802354', '18800', 'Pet Appearance'), /* Black-hearted Earrings */
('1802353', '15000', 'Pet Appearance'), /* Sanchito's Carrot */
('1802352', '20300', 'Pet Appearance'), /* Bandit Goggles */
('1802347', '20100', 'Pet Appearance'), /* Ghost of Death */
('1802346', '21300', 'Pet Appearance'), /* Ghost of Fear */
('1802345', '22500', 'Pet Appearance'), /* Penguin Earmuff Set */
('1802344', '13900', 'Pet Appearance'), /* Parrot Admiral Hat */
('1802351', '19000', 'Pet Appearance'), /* Bean's Headset */
('1802350', '15600', 'Pet Appearance'), /* Caught Fish */
('1802349', '15200', 'Pet Appearance'), /* Dragon Orb */
('1802348', '15700', 'Pet Appearance'), /* Ghost of Jealousy */
('1802339', '14500', 'Pet Appearance'), /* Blue Birdy */
('1802338', '14600', 'Pet Appearance'), /* Pink Bean's Headset */
('1802337', '24000', 'Pet Appearance'), /* Tube */
('1802336', '25000', 'Pet Appearance'), /* Mini Celestial Wand */
('1802343', '20700', 'Pet Appearance'), /* Starry Muffler */
('1802342', '16800', 'Pet Appearance'), /* Bonkey's Ammunition Box */
('1802341', '21900', 'Pet Appearance'), /* Adriano's Hat */
('1802340', '21400', 'Pet Appearance'), /* Craw's Pirate Hat */
('1802395', '24800', 'Pet Appearance'), /* Baby Grumpy Koala */
('1802394', '18600', 'Pet Appearance'), /* Baby Frumpy Koala */
('1802392', '14200', 'Pet Appearance'), /* Boxing Gloves */
('1802396', '14000', 'Pet Appearance'), /* Baby Nerdy Koala */
('1802387', '23300', 'Pet Appearance'), /* Red Elly's Dress Hat */
('1802386', '20300', 'Pet Appearance'), /* Puffy Teddy's Crown */
('1802385', '14200', 'Pet Appearance'), /* Cutie Teddy's Baby Bonnet */
('1802384', '24500', 'Pet Appearance'), /* Fluffy Teddy's Bunny Ears */
('1802391', '19500', 'Pet Appearance'), /* Pumpkin Mack's Magic Lantern */
('1802390', '22500', 'Pet Appearance'), /* Pumpkin Zack's Magic Lantern */
('1802389', '12700', 'Pet Appearance'), /* Pumpkin Jack's Magic Lantern */
('1802388', '14900', 'Pet Appearance'), /* Blue Burro's Toy Carrot */
('1802378', '13900', 'Pet Appearance'), /* Shark's Mini Tube */
('1802382', '17800', 'Pet Appearance'), /* Purple Light Ring */
('1802381', '12200', 'Pet Appearance'), /* Golden Light Ring */
('1802380', '24200', 'Pet Appearance'), /* Blue Light Ring */
('1802371', '24800', 'Pet Appearance'), /* Tiny Envy */
('1802370', '22700', 'Pet Appearance'), /* Tiny Sadness */
('1802369', '22200', 'Pet Appearance'), /* Tiny Fright */
('1802368', '19100', 'Pet Appearance'), /* Frost Mallet */
('1802375', '17300', 'Pet Appearance'), /* Starwing's Star Trail */
('1802373', '17200', 'Pet Appearance'), /* Rose */
('1802372', '14200', 'Pet Appearance'), /* Sunglass */
('1802427', '22000', 'Pet Appearance'), /* Roo-A Baby Bonnet */
('1802426', '24000', 'Pet Appearance'), /* Peach Halo */
('1802425', '18400', 'Pet Appearance'), /* Lime Halo */
('1802424', '15500', 'Pet Appearance'), /* Honey Halo */
('1802431', '17900', 'Pet Appearance'), /* Red Devil's Collar */
('1802430', '20100', 'Pet Appearance'), /* Yellow Devil's Collar */
('1802429', '23000', 'Pet Appearance'), /* Roo-C Baby Bonnet */
('1802428', '13100', 'Pet Appearance'), /* Roo-B Baby Bonnet */
('1802419', '13700', 'Pet Appearance'), /* Chipmunch's Acorn */
('1802418', '19500', 'Pet Appearance'), /* Chippermunk's Acorn  */
('1802420', '22400', 'Pet Appearance'), /* Chubmunk's Acorn */
('1802459', '24000', 'Pet Appearance'), /* Ifia's Rose */
('1802458', '13700', 'Pet Appearance'), /* Hot Pot Von Bon's Staff */
('1802463', '24600', 'Pet Appearance'), /* Kangaroo Boxing Gloves */
('1802462', '21700', 'Pet Appearance'), /* Gentleman Bow Tie */
('1802461', '12300', 'Pet Appearance'), /* Hilla's Blackheart */
('1802460', '18600', 'Pet Appearance'), /* Orchid's Hat */
('1802451', '14800', 'Pet Appearance'), /* Yellowdillow Circus Ball */
('1802450', '24700', 'Pet Appearance'), /* Pinkadillo Star Ball */
('1802449', '17800', 'Pet Appearance 2'), /* Yeti Robot Antenna */
('1802448', '18600', 'Pet Appearance 2'), /* Ice Stick */
('1802452', '14400', 'Pet Appearance 2'), /* Greenadillo Soccer Ball */
('1802447', '20000', 'Pet Appearance 2'), /* Snake's Pink Bow */
('1802446', '14600', 'Pet Appearance 2'), /* Pierre's Umbrella */
('1802445', '13700', 'Pet Appearance 2'), /* Von Bon's Staff */
('1802444', '25000', 'Pet Appearance 2'), /* Alluring Mirror */
('1802435', '21100', 'Pet Appearance 2'), /* Miasmic Horns */
('1802434', '17700', 'Pet Appearance 2'), /* Chilling Horns */
('1802433', '15300', 'Pet Appearance 2'), /* Blazing Horns */
('1802432', '18800', 'Pet Appearance 2'), /* Blue Devil's Collar */
('1802436', '20900', 'Pet Appearance 2'), /* Gingerbread Bow Tie */
('1802491', '21200', 'Pet Appearance 2'), /* Lil Moonbeam's Hairband */
('1802490', '13600', 'Pet Appearance 2'), /* Devil Bat */
('1802489', '23000', 'Pet Appearance 2'), /* Frankie's Halo */
('1802488', '21700', 'Pet Appearance 2'), /* Cloud Bag */
('1802493', '13300', 'Pet Appearance 2'), /* Cute Rabbit Hat */
('1802492', '20600', 'Pet Appearance 2'), /* Helium Filled Dreams */
('1802483', '12200', 'Pet Appearance 2'), /* Purple Pengy Hat */
('1802482', '13200', 'Pet Appearance 2'), /* Pink Pengy Hat */
('1802481', '20900', 'Pet Appearance 2'), /* Li'l Arby's Bell */
('1802480', '21500', 'Pet Appearance 2'), /* Li'l Fort's Scarf */
('1802484', '17900', 'Pet Appearance 2'), /* Blue Pengy Hat */
('1802475', '20300', 'Pet Appearance 2'), /* Kiwi Puff Wings */
('1802474', '12700', 'Pet Appearance 2'), /* Little RED Admin */
('1802473', '19800', 'Pet Appearance 2'), /* Black Kid Pumpkin */
('1802472', '17900', 'Pet Appearance 2'), /* Green Kid Pumpkin */
('1802479', '17600', 'Pet Appearance 2'), /* Li'l Lai's Necklace */
('1802478', '16500', 'Pet Appearance 2'), /* Happy Bean's Hat */
('1802477', '13700', 'Pet Appearance 2'), /* Mango Puff Wings */
('1802476', '21500', 'Pet Appearance 2'), /* Berry Puff Wings */
('1802467', '15400', 'Pet Appearance 2'), /* Gollux's Halo */
('1802466', '19900', 'Pet Appearance 2'), /* Burnt Chestnut Leaf */
('1802465', '21400', 'Pet Appearance 2'), /* Chestnut Leaf */
('1802464', '22700', 'Pet Appearance 2'), /* Unripe Chestnut Leaf */
('1802471', '14300', 'Pet Appearance 2'), /* Purple Kid Pumpkin */
('1802522', '12300', 'Pet Appearance 2'), /* Captain Cafe's Whipped Cream */
('1802521', '18400', 'Pet Appearance 2'), /* Lady Hot Tea's Spoon */
('1802520', '13900', 'Pet Appearance 2'), /* Matcha Man's Leaf */
('1802527', '18300', 'Pet Appearance 2'), /* Mage Sheep Cane */
('1802526', '16800', 'Pet Appearance 2'), /* Warrior Sheep Sword */
('1802524', '21700', 'Pet Appearance 2'), /* New Pink Harp Seal Hat */
('1802512', '21300', 'Pet Appearance 2'), /* Gelimer's Teddy */
('1802519', '14200', 'Pet Appearance 2'), /* Fluffram Ribbon (Pet Equip) */
('1802505', '22200', 'Pet Appearance 2'), /* Purple Electronic Display */
('1802504', '19100', 'Pet Appearance 2'), /* Orange Electronic Display */
('1802511', '22800', 'Pet Appearance 2'), /* Orchid's Tiny IV */
('1802510', '21500', 'Pet Appearance 2'), /* Lotus's Aura */
('1802509', '13300', 'Pet Appearance 2'), /* Lil' Bobble Hat */
('1802497', '23900', 'Pet Appearance 2'), /* Moon Miho */
('1802503', '12200', 'Pet Appearance 2'), /* Chameleon's Rainbow */
('1802502', '22600', 'Pet Appearance 2'), /* Chun's Ambition */
('1802501', '16900', 'Pet Appearance 2'), /* Hong's Heart */
('1802500', '17200', 'Pet Appearance 2'), /* Lyn's Tiara */
('1802555', '12600', 'Pet Appearance 2'), /* Phantom's Halo */
('1802554', '18900', 'Pet Appearance 2'), /* Aran's Halo */
('1802553', '24300', 'Pet Appearance 2'), /* Evan's Halo */
('1802552', '18100', 'Pet Appearance 2'), /* Mousy Overalls */
('1802559', '23600', 'Pet Appearance 2'), /* Damien's Halo */
('1802558', '16900', 'Pet Appearance 2'), /* Shade's Halo */
('1802557', '21100', 'Pet Appearance 2'), /* Mercedes's Halo */
('1802556', '18000', 'Pet Appearance 2'), /* Luminous's Halo */
('1802547', '21100', 'Pet Appearance 2'), /* Pudgycat Fancytie */
('1802546', '12400', 'Pet Appearance 2'), /* Meerkat Instrument */
('1802545', '17700', 'Pet Appearance 2'), /* Samson Cat's Emerald Yarn */
('1802544', '20800', 'Pet Appearance 2'), /* Cheesy Cat's Purple Yarn */
('1802551', '23700', 'Pet Appearance 2'), /* Lil Zakum's Black Sunglasses */
('1802550', '16000', 'Pet Appearance 2'), /* Candy Temptation */
('1802549', '17200', 'Pet Appearance 2'), /* Pie Temptation */
('1802548', '14100', 'Pet Appearance 2'), /* Cake Temptation */
('1802539', '24000', 'Pet Appearance 2'), /* Sailor Seal Star Glasses */
('1802538', '17800', 'Pet Appearance 2'), /* Fox Mask */
('1802537', '14200', 'Pet Appearance 2'), /* Fancy Fox Mask */
('1802536', '24700', 'Pet Appearance 2'), /* Cookiebear Fork */
('1802543', '24600', 'Pet Appearance 2'), /* Tiny Nero's Transformation Set */
('1802542', '21100', 'Pet Appearance 2'), /* Ducky's Suave Ribbon */
('1802541', '14500', 'Pet Appearance 2'), /* Steward Seal Star Glass */
('1802540', '23600', 'Pet Appearance 2'), /* Admiral Seal Star Glasses */
('1802531', '18300', 'Pet Appearance 2'), /* Fluffy Lily's Ribbon */
('1802530', '13600', 'Pet Appearance 2'), /* Furry Elwin's Necklace */
('1802529', '12300', 'Pet Appearance 2'), /* Orange Leaf */
('1802528', '19100', 'Pet Appearance 2'), /* Cleric Sheep Staff */
('1802535', '12000', 'Pet Appearance 2'), /* Bananabear Fork */
('1802534', '15500', 'Pet Appearance 2'), /* Strawbear Fork */
('1802532', '23300', 'Pet Appearance 2'), /* Baby Nero's Ball of Yarn */
('1802587', '17600', 'Pet Appearance 2'), /* Hopeful Dreams */
('1802586', '24200', 'Pet Appearance 2'), /* Idyllic Dreams */
('1802585', '20300', 'Pet Appearance 2'), /* Rosy Dreams */
('1802584', '14000', 'Pet Appearance 2'), /* Red Bow Tie */
('1802588', '17100', 'Pet Appearance 2'), /* Cuddly Chick */
('1802579', '13000', 'Pet Appearance 2'), /* Sasha's Ribbon Collar */
('1802578', '18700', 'Pet Appearance 2'), /* Fondue's Ribbon Collar */
('1802577', '21500', 'Pet Appearance 2'), /* Fallen Angel Headband */
('1802576', '16600', 'Pet Appearance 2'), /* Anguish Crow */
('1802583', '24300', 'Pet Appearance 2'), /* Witch's Pink Ribbon */
('1802582', '24700', 'Pet Appearance 2'), /* Witch's Purple Ribbon */
('1802581', '12100', 'Pet Appearance 2'), /* Witch's Red Ribbon */
('1802580', '12000', 'Pet Appearance 2'), /* Coco's Ribbon Collar */
('1802571', '14200', 'Pet Appearance 2'), /* TuTu's Umbrella */
('1802570', '19600', 'Pet Appearance 2'), /* Nene's Flower */



('1082040', '3300', 'Glove'), /* Red Boxing Gloves */
('1082041', '7500', 'Glove'), /* Blue Boxing Gloves */
('1082077', '7900', 'Glove'), /* White Bandage */
('1082078', '8900', 'Glove'), /* Brown Bandage */
('1082079', '4600', 'Glove'), /* Black Bandage */
('1082057', '8700', 'Glove'), /* Brown Baseball Glove */
('1082058', '5900', 'Glove'), /* Blue Baseball Glove */
('1082113', '8100', 'Glove'), /* Hair-Cutter Gloves */
('1082124', '4600', 'Glove'), /* Mesoranger Gloves */
('1082161', '5500', 'Glove'), /* Star Gloves */
('1082162', '4400', 'Glove'), /* Love Gloves */
('1082165', '6100', 'Glove'), /* White Rabbit Gloves */
('1082166', '7400', 'Glove'), /* Nero Gloves */
('1082169', '5300', 'Glove'), /* Moon Bunny Gloves */
('1082170', '8900', 'Glove'), /* Rose Crystal Watch */
('1082171', '6400', 'Glove'), /* Blue Watch */
('1082172', '4800', 'Glove'), /* Snowflake Gloves */
('1082173', '3500', 'Glove'), /* Lightning Gloves */
('1082155', '7600', 'Glove'), /* Snowman Gloves */
('1082156', '7100', 'Glove'), /* Teddy Bear Gloves */
('1082157', '8300', 'Glove'), /* Skull Gloves */
('1082224', '8700', 'Glove'), /* Tania Gloves */
('1082225', '3600', 'Glove'), /* Mercury Gloves */
('1082227', '5200', 'Glove'), /* Skull Tattoo */
('1082229', '6900', 'Glove'), /* Heart Ribbon Glove */
('1082231', '4400', 'Glove'), /* Luxury Wristwatch */
('1082233', '4500', 'Glove'), /* Moomoo Gloves */
('1082261', '6500', 'Glove'), /* Freud's Gloves */
('1082267', '7800', 'Glove'), /* Cat Set Mittens */
('1082268', '7500', 'Glove'), /* Dual Blade Gloves */
('1082247', '3600', 'Glove'), /* Cutie Birk Gloves */
('1082249', '6900', 'Glove'), /* Neon Amulet */
('1082251', '7500', 'Glove'), /* Rock Chain Armlet */
('1082253', '4400', 'Glove'), /* Neon Sign Amulet */
('1082255', '6300', 'Glove'), /* Maple Racing Glove */
('1082272', '8100', 'Glove'), /* Evan Golden Gloves */
('1082273', '8900', 'Glove'), /* Hawkeye Ocean Gloves */
('1082274', '5000', 'Glove'), /* Evan Gloves */
('1082282', '6400', 'Glove'), /* Battle Mage Gloves */
('1082310', '6500', 'Glove'), /* Winter 2011 Moon Bunny Gloves */
('1082312', '5000', 'Glove'), /* Rainbow Bracelet */
('1082421', '8200', 'Glove'), /* Blue Dragon Gloves */
('1082422', '7600', 'Glove'), /* Red Dragon Gloves */
('1082423', '5500', 'Glove'), /* Intergalactic Gloves */
('1082407', '7200', 'Glove'), /* Dark Force Gloves  */
('1082448', '7800', 'Glove'), /* Arabian Gold Bracelet */
('1082517', '3900', 'Glove'), /* Golf Gloves */
('1082525', '6400', 'Glove'), /* Succubus Gloves */
('1082527', '3600', 'Glove'), /* Golf Gloves */
('1082500', '8500', 'Glove'), /* Dark Devil Gloves */
('1082501', '7300', 'Glove'), /* Dark Force Gloves */
('1082504', '8200', 'Glove'), /* Kitty Gloves */
('1082505', '5200', 'Glove'), /* Xenon Neo-Tech Gloves */
('1082548', '6400', 'Glove'), /* Star Bracelet */
('1082554', '8400', 'Glove'), /* Princess of Time Gloves */
('1082555', '4000', 'Glove'), /* Fairy Spark */
('1082558', '6100', 'Glove'), /* Kirito's Gloves */
('1082580', '8100', 'Glove'), /* Pony Gloves */
('1082581', '4800', 'Glove'), /* Chocolate Ribbon */
('1082585', '6400', 'Glove'), /* Guardian Gloves */
('1082587', '8400', 'Glove'), /* Pink Panda Gloves */
('1082588', '7900', 'Glove'), /* Rainbow Marbles */
('1082560', '7900', 'Glove'), /* Dark Devil Gloves */
('1082561', '8800', 'Glove'), /* Freud's Gloves */
('1082563', '5200', 'Glove'), /* Heathcliff's Gloves */
('1082564', '3300', 'Glove'), /* Yui's Gloves */
('1082565', '3700', 'Glove'), /* Chocolate Ribbon */
('1082571', '3800', 'Glove'), /* Mr. K's Cat Gloves */
('1082620', '4000', 'Glove'), /* Aloha Flower Accessory */
('1082623', '4400', 'Glove'), /* Bright Angel Gloves */
('1082592', '8300', 'Glove'), /* Burning Ghost Wristband */
('1082641', '3400', 'Glove'), /* Blue Bird Gloves */
('1082642', '3400', 'Glove'), /* Snowman Gloves */
('1082643', '8400', 'Glove'), /* Cutie Birk Gloves */
('1082624', '7200', 'Glove'), /* Dark Devil Gloves */
('1082631', '5600', 'Glove'), /* Glowing Bracelet */
('1082632', '5100', 'Glove'), /* Worn Skull Gloves */
('1082633', '4900', 'Glove'), /* Skull Gloves */
('1050012', '22500', 'Overall'), /* Grey Skull Overall */
('1050013', '22500', 'Overall'), /* Red Skull Overall */
('1050014', '22500', 'Overall'), /* Green Skull Overall */
('1050015', '22500', 'Overall'), /* Blue Skull Overall */
('1050004', '21400', 'Overall'), /* Blue Officer Uniform */
('1050032', '21400', 'Overall'), /* Silver Officer Uniform */
('1050033', '21400', 'Overall'), /* Black Officer Uniform */
('1050034', '21400', 'Overall'), /* Red Officer Uniform */
('1050040', '21800', 'Overall'), /* Red Swimming Trunk */
('1050041', '27400', 'Overall'), /* Blue Swimming Trunk */
('1050042', '10200', 'Overall'), /* Fine Brown Hanbok */
('1050043', '33600', 'Overall'), /* Fine Black Hanbok */
('1050044', '18700', 'Overall'), /* Fine Blue Hanbok */
('1050016', '28600', 'Overall'), /* Orange Skull Overall */
('1050017', '27100', 'Overall'), /* Yellow Tights */
('1050020', '20100', 'Overall'), /* Paper Box */
('1050065', '26500', 'Overall'), /* Blue Celebration Hanbok */
('1050066', '31300', 'Overall'), /* Green Celebration Hanbok */
('1050071', '31900', 'Overall'), /* Men's Ninja Overall */
('1050079', '17100', 'Overall'), /* Black Coat of Death */
('1050050', '28400', 'Overall'), /* Dark Suit */
('1050057', '32900', 'Overall'), /* Ghost Uniform */
('1050101', '13800', 'Overall'), /* Western Cowboy */
('1050109', '19900', 'Overall'), /* Green Picnicwear */
('1050110', '24800', 'Overall'), /* Sky Blue Picnicwear */
('1050111', '26700', 'Overall'), /* Boxing Trunks */
('1050128', '13000', 'Overall'), /* Go! Korea! */
('1050129', '19700', 'Overall'), /* Korean Martial Art Uniform */
('1050135', '30400', 'Overall'), /* Beau Tuxedo */
('1050136', '25500', 'Overall'), /* Black Male Fur Coat */
('1050137', '29300', 'Overall'), /* White Male Fur Coat */
('1050138', '11700', 'Overall'), /* School Uniform with Hoody Jumper */
('1050139', '24500', 'Overall'), /* Boys Uniform */
('1050140', '34200', 'Overall'), /* Thai Formal Dress */
('1050141', '9800', 'Overall'), /* Blue Kitty Hood */
('1050142', '19100', 'Overall'), /* Hooded Korean Traditional Costume */
('1050143', '28400', 'Overall'), /* Retro School Uniform */
('1050112', '17900', 'Overall'), /* Wedding Dress */
('1050113', '16100', 'Overall'), /* Wedding Tuxedo */
('1050114', '14700', 'Overall'), /* Poseidon Armor */
('1050115', '30400', 'Overall'), /* Sea Hermit Robe */
('1050116', '17100', 'Overall'), /* Race Ace Suit */
('1050117', '31100', 'Overall'), /* Tiny Blue Swimshorts */
('1050118', '27600', 'Overall'), /* Tiny Black Swimshorts */
('1050120', '32900', 'Overall'), /* Horoscope Overall */
('1050121', '25100', 'Overall'), /* Oriental Bridegroom Suit */
('1050122', '20700', 'Overall'), /* Unseemly Wedding Suit */
('1050123', '21800', 'Overall'), /* Royal Hanbok */
('1050124', '19200', 'Overall'), /* Lunar Celebration Suit */
('1050125', '11900', 'Overall'), /* Brown Casual Look */
('1050126', '32000', 'Overall'), /* Imperial Uniform */
('1050160', '30300', 'Overall'), /* Nya-ong's Long Hood T-shirt */
('1050161', '12800', 'Overall'), /* Bunny Boy */
('1050168', '25600', 'Overall'), /* Evan Elegant Suit */
('1050170', '23300', 'Overall'), /* Napoleon Uniform */
('1050171', '12200', 'Overall'), /* Evan Outfit */
('1050145', '22500', 'Overall'), /* Violet Tunic */
('1050146', '32400', 'Overall'), /* Buddy Overall Jeans */
('1050147', '29200', 'Overall'), /* Princess Korean Traditional Costume */
('1050148', '25600', 'Overall'), /* Shin-Hwa High Uniform */
('1050152', '16600', 'Overall'), /* Sailor Outfit */
('1050153', '32200', 'Overall'), /* Exotic Festival Outfit */
('1050154', '23900', 'Overall'), /* Seraphim Suit */
('1050156', '10000', 'Overall'), /* Blue Towel */
('1050157', '30300', 'Overall'), /* Cutie Boy Overall */
('1050158', '12600', 'Overall'), /* Brown Casual Look */
('1050159', '13500', 'Overall'), /* Black Male Fur Coat */
('1050193', '26600', 'Overall'), /* Red Overall Pants */
('1050177', '23700', 'Overall'), /* Maple Boy School Uniform */
('1050178', '13100', 'Overall'), /* Napoleon Uniform */
('1050179', '23000', 'Overall'), /* Holiday Party Gear */
('1050186', '30300', 'Overall'), /* Rookie Maple Boy School Uniform */
('1050187', '23900', 'Overall'), /* Blue Snow Flower Wear */
('1050188', '21500', 'Overall'), /* Flower Heir Hanbok */
('1050190', '34400', 'Overall'), /* Military Pop Star */
('1050226', '9500', 'Overall'), /* Imperial Garnet Suit */
('1050227', '26200', 'Overall'), /* Mint Snow Outfit */
('1050229', '11300', 'Overall'), /* Gentle Hanbok */
('1050232', '20000', 'Overall'), /* Chamomile Tea Time */
('1050234', '29100', 'Overall'), /* Magic Star Suit */
('1050235', '13300', 'Overall'), /* Prince Charming */
('1050208', '10600', 'Overall'), /* Schoolboy Formals */
('1050209', '28200', 'Overall'), /* Moonlight Serenade Get-Up */
('1050210', '17800', 'Overall'), /* Light Cotton Candy Overalls */
('1050215', '13500', 'Overall'), /* Maple Doctor's Scrubs (M) */
('1050220', '29300', 'Overall'), /* Dark Force Mail (M)  */
('1050256', '26700', 'Overall'), /* Alps Boy Overall */
('1050241', '27700', 'Overall'), /* Jett's Outfit(M) */
('1050242', '30800', 'Overall'), /* Opening Star */
('1050246', '27400', 'Overall'), /* Saint Luminous */
('1050247', '17600', 'Overall'), /* Evergreen Magistrate Outfit */
('1050248', '10900', 'Overall'), /* Halloween Leopard Costume */
('1100000', '6600', 'Cape'), /* Napoleon Cape */
('1102005', '3800', 'Cape'), /* Baby Angel Wings */
('1102006', '5500', 'Cape'), /* Devil Wings */
('1102007', '3500', 'Cape'), /* Yellow Star Cape */
('1102008', '3600', 'Cape'), /* Blue Star Cape */
('1102009', '6800', 'Cape'), /* Red Star Cape */
('1102010', '6200', 'Cape'), /* Black Star Cape */
('1102036', '6100', 'Cape'), /* Red Landcell Pack */
('1102037', '5200', 'Cape'), /* Black Landcell Pack */
('1102038', '7500', 'Cape'), /* Blue Landcell Pack */
('1102044', '6800', 'Cape'), /* Red G-Wing Jetpack */
('1102045', '3400', 'Cape'), /* Blue G-Wing Jetpack */
('1102019', '6200', 'Cape'), /* Korean-Flagged Cape */
('1102020', '7400', 'Cape'), /* Turtle Shell */
('1102025', '5200', 'Cape'), /* Red Hood */
('1102065', '4300', 'Cape'), /* Christmas Cape */
('1102066', '5900', 'Cape'), /* Dracula Cloak */
('1102067', '6300', 'Cape'), /* Tiger Tail */
('1102068', '5200', 'Cape'), /* Harpie Cape */
('1102069', '4200', 'Cape'), /* Pink Wings */
('1102070', '4000', 'Cape'), /* Blue Book Bag */
('1102072', '8700', 'Cape'), /* Yellow-Green Backpack */
('1102073', '6800', 'Cape'), /* Hot Pink Backpack */
('1102074', '4100', 'Cape'), /* Dragonfly Wings */
('1102075', '3500', 'Cape'), /* Bat's Bane */
('1102076', '4200', 'Cape'), /* Newspaper Cape */
('1102077', '7500', 'Cape'), /* Cotton Blanket */
('1102049', '6400', 'Cape'), /* Blue Nymph Wing */
('1102050', '5100', 'Cape'), /* Green Nymph Wing */
('1102051', '5400', 'Cape'), /* Yellow Nymph Wing */
('1102052', '6400', 'Cape'), /* Pink Nymph Wing */
('1102058', '6100', 'Cape'), /* Gargoyle Wings */
('1102059', '8100', 'Cape'), /* Michael Wings */
('1102060', '4100', 'Cape'), /* Pink Ribbon */
('1102062', '4400', 'Cape'), /* Martial Cape */
('1102098', '3400', 'Cape'), /* Coffin of Gloom */
('1102107', '8200', 'Cape'), /* Rocket Booster */
('1102108', '8700', 'Cape'), /* Fallen Angel Tail */
('1102110', '3500', 'Cape'), /* Chipmunk Tail */
('1102111', '5100', 'Cape'), /* Elephant Balloon */
('1102091', '6600', 'Cape'), /* Summer Kite */
('1102092', '5900', 'Cape'), /* Cuddle Bear */
('1102093', '4100', 'Cape'), /* Heart Balloon */
('1102094', '5200', 'Cape'), /* Sun Wu Kong Tail */
('1102137', '3800', 'Cape'), /* Orange Mushroom Balloon */
('1102138', '7600', 'Cape'), /* Pink Wing Bag */
('1102141', '4600', 'Cape'), /* Pepe Balloon */
('1102142', '7300', 'Cape'), /* The Flaming Cape */
('1102112', '7100', 'Cape'), /* Bunny Doll */
('1102160', '4100', 'Cape'), /* Baby Lupin Cape */
('1102162', '5100', 'Cape'), /* Baby White Monkey Balloon */
('1102164', '3700', 'Cape'), /* Maple MSX Guitar */
('1102169', '5400', 'Cape'), /* Blue Wing Bag */
('1102171', '4200', 'Cape'), /* 3rd Anniversary Balloon */
('1102175', '8700', 'Cape'), /* Cutie Birk Wings */
('1102144', '5600', 'Cape'), /* Sage Cape */
('1102148', '6800', 'Cape'), /* Tania Cloak */
('1102149', '4000', 'Cape'), /* Mercury Cloak */
('1102150', '6000', 'Cape'), /* Count Dracula Cape */
('1102151', '3700', 'Cape'), /* Lost Kitty */
('1102152', '7800', 'Cape'), /* Pirate Emblem Flag */
('1102153', '6100', 'Cape'), /* Sunfire Wings */
('1102154', '6900', 'Cape'), /* Zakum Arms */
('1102155', '6200', 'Cape'), /* My Buddy Rex */
('1102156', '4700', 'Cape'), /* Aerial Wave Cape */
('1102157', '7800', 'Cape'), /* Puppet Strings */
('1102158', '3400', 'Cape'), /* Peacock Feather Cape */
('1102159', '3600', 'Cape'), /* White Monkey Balloon */
('1102196', '8700', 'Cape'), /* Snowflake Scarf */
('1102197', '4700', 'Cape'), /* Yellow Canary */
('1102202', '3300', 'Cape'), /* Galactic Flame Cape */
('1102203', '4700', 'Cape'), /* Super Rocket Booster */
('1102204', '8100', 'Cape'), /* Romantic Rose */
('1102184', '6300', 'Cape'), /* Aurora Happy Wing */
('1102185', '6700', 'Cape'), /* Rainbow Scarf */
('1102186', '4400', 'Cape'), /* Kitty Parachute */
('1102187', '3700', 'Cape'), /* Golden Fox Tail */
('1102188', '3600', 'Cape'), /* Silver Fox Tail */
('1102224', '6500', 'Cape'), /* Lamby Cape */
('1102229', '8700', 'Cape'), /* Bear Cape */
('1102232', '6600', 'Cape'), /* Celestial Star */
('1102238', '5600', 'Cape'), /* Cat Set Tail */
('1102239', '5000', 'Cape'), /* Dual Blade Cape */
('1102208', '8300', 'Cape'), /* Slime Effect Cape */
('1102209', '5100', 'Cape'), /* Baby White Monkey Balloon */
('1102210', '6500', 'Cape'), /* Honeybee's Sting */
('1102211', '8400', 'Cape'), /* Bound Wings */
('1102212', '5800', 'Cape'), /* Lost Child */
('1102213', '7800', 'Cape'), /* Pink Bean Tail */
('1070000', '8700', 'Shoes'), /* Blue Gomushin */
('1070002', '5000', 'Shoes'), /* Kimono Shoes (M) */
('1070003', '6100', 'Shoes'), /* Black Shoes of Death */
('1070004', '5400', 'Shoes'), /* Blue Western Walkers */
('1070006', '7200', 'Shoes'), /* Royal Costume Shoes */
('1070007', '3800', 'Shoes'), /* Lunar Celebration Shoes */
('1070008', '6200', 'Shoes'), /* Korean Martial Arts Shoes */
('1070009', '4400', 'Shoes'), /* Paris Wingtips */
('1070014', '3900', 'Shoes'), /* Veras Heels [m] */
('1070015', '7400', 'Shoes'), /* Bunny Boots [m] */
('1070016', '6500', 'Shoes'), /* Dandy Silver Sneaks */
('1070018', '7600', 'Shoes'), /* Napoleon Shoes  */
('1070019', '7600', 'Shoes'), /* Napoleon Boots */
('1070020', '5000', 'Shoes'), /* Twinkling Boy Glow Shoes */
('1070024', '6800', 'Shoes'), /* Garnet-Studded Boots */
('1070028', '8700', 'Shoes'), /* Evergreen Magistrate Pretty Shoes */
('1070031', '5700', 'Shoes'), /* Alps Boy Shoes */
('1070064', '4200', 'Shoes'), /* Mad Doctor Boots */
('1070065', '5700', 'Shoes'), /* Blue Macaron Shoes */
('1070067', '6700', 'Shoes'), /* Cozy Snow Flower */
('1070068', '8500', 'Shoes'), /* The Kingdom Dress Shoes of King */
('1070069', '4500', 'Shoes'), /* Soaring Sky */
('1070070', '4100', 'Shoes'), /* Yeonhwa School Shoes */
('1070071', '8600', 'Shoes'), /* Mr. Time Shoes */
('1070072', '5900', 'Shoes'), /* Cutie Farmer Sneakers */
('1070073', '4300', 'Shoes'), /* Bloody Sneakers */
('1070075', '4600', 'Shoes'), /* Time Master Shoes */
('1070077', '8400', 'Shoes'), /* Mr. Time Shoes */
('1022048', '6200', 'Face'), /* Transparent Eye Accessory */
('1022079', '6200', 'Eye'), /* Clear Glasses */
('1022075', '6100', 'Eye'), /* Twinkling Eyes */
('1022074', '5300', 'Eye'), /* Gaga Glasses */
('1022072', '4500', 'Eye'), /* Yellow Shutter Shades */
('1022071', '5700', 'Eye'), /* Red Shutter Shades */
('1022070', '6400', 'Eye'), /* Green Shutter Shades */
('1022069', '5700', 'Eye'), /* Orange Shutter Shades */
('1022068', '5100', 'Eye'), /* White Shades */
('1022066', '5700', 'Eye'), /* Star Spectacles */
('1022065', '6600', 'Eye'), /* Alphabet Glasses */
('1022064', '5600', 'Eye'), /* Big Red Glasses */
('1022095', '5800', 'Eye'), /* I Like Money */
('1022090', '4400', 'Eye'), /* Gaga Glasses */
('1022087', '5900', 'Eye'), /* Green Eye Mask */
('1022086', '5600', 'Eye'), /* Blue Eye Mask */
('1022085', '4800', 'Eye'), /* Pink Eye Mask */
('1022084', '4600', 'Eye'), /* Eye Mask (Red) */
('1022083', '5600', 'Eye'), /* Hitman Sunglasses */
('1022081', '6000', 'Eye'), /* Cracked Glasses */
('1022110', '4200', 'Eye'), /* Big White Sunglasses */
('1022109', '4500', 'Eye'), /* Pink Two-Toned Shades */
('1022108', '4200', 'Eye'), /* Yellow Two-Toned Shades */
('1022102', '6000', 'Eye'), /* LED Sunglasses */
('1022121', '4700', 'Eye'), /* X-Ray Glasses */
('1022142', '5900', 'Eye'), /* Yellow Shutter Shades */
('1022158', '5200', 'Eye'), /* [MS Discount] Black Sunglasses */
('1022173', '6200', 'Eye'), /* Silky Black Eye Patch */
('1022188', '4800', 'Eye'), /* Blank Eye Patch */
('1022187', '5600', 'Eye'), /* Broken Up Today */
('1052677', '6400', 'Top'), /* Asuna's Dress */
('1052678', '8000', 'Top'), /* Leafa's Dress */
('1052685', '3800', 'Top'), /* Yui's Dress */
('1040005', '3500', 'Top'), /* Orange Baseball Jacket */
('1040001', '5600', 'Top'), /* Black Blazer */
('1040027', '4800', 'Top'), /* Old School Blazer */
('1040047', '5000', 'Top'), /* Dark Rider */
('1040046', '3400', 'Top'), /* Shine Rider */
('1040045', '3400', 'Top'), /* Red Rider */
('1040056', '5700', 'Top'), /* Original Disco Shirt */
('1040055', '7500', 'Top'), /* Orange Disco Shirt */
('1040054', '8900', 'Top'), /* Green Disco Shirt */
('1040053', '3500', 'Top'), /* Orange Striped Trainer */
('1040052', '5100', 'Top'), /* Green Striped Trainer */
('1040051', '4200', 'Top'), /* Blue Striped Trainer */
('1040078', '4300', 'Top'), /* Pre-School Uniform Top */
('1040077', '5700', 'Top'), /* Cowboy Top */
('1040066', '4600', 'Top'), /* Red Wild Top */
('1040065', '8700', 'Top'), /* Brown Wild Top */
('1040064', '3900', 'Top'), /* Wild Top */
('1040101', '7900', 'Top'), /* Skull T-Shirt */
('1040127', '4600', 'Top'), /* Blue Heart Tanktop */
('1040126', '6100', 'Top'), /* Yellow Frill Sleeveless */
('1040125', '4500', 'Top'), /* Military Cargo Jacket */
('1040124', '8500', 'Top'), /* Crusader T-Shirt */
('1040123', '4800', 'Top'), /* Prep School Uniform */
('1040119', '4300', 'Top'), /* Ragged Top */
('1040114', '7000', 'Top'), /* Hawaiian Shirt */
('1040143', '5500', 'Top'), /* Pink Top */
('1040141', '6700', 'Top'), /* Blue Sailor Shirt */
('1040140', '6900', 'Top'), /* Pink Mimi Blouse */
('1040139', '6900', 'Top'), /* Island Beads (M) */
('1040138', '3900', 'Top'), /* Mercury Leather Jacket (M) */
('1040137', '7700', 'Top'), /* Tania Tailored Jacket */
('1040135', '8100', 'Top'), /* Muscle Man T */
('1040134', '7800', 'Top'), /* Orange Puffy Jacket */
('1040133', '5500', 'Top'), /* Long Blue Shirt */
('1040132', '8500', 'Top'), /* Palm Tree Tanktop */
('1040131', '7800', 'Top'), /* Pink Tie Casual Suit */
('1040130', '5300', 'Top'), /* Green Tie Casual Suit */
('1040129', '5600', 'Top'), /* Red Casual Suit */
('1040128', '5700', 'Top'), /* Blue Line Tanktop */
('1040154', '6300', 'Top'), /* Pre-School Top */
('1040148', '7200', 'Top'), /* Retro School Uniform Jacket */
('1040144', '7300', 'Top'), /* Bulletproof Vest */
('1040191', '4400', 'Top'), /* [MS Custom] Orange Disco Shirt */
('1040190', '3800', 'Top'), /* [MS Custom] Orange Striped Trainer */
('1040186', '7900', 'Top'), /* Cowboy Shirt */
('1040197', '3400', 'Top'), /* Lalala Sleeveless Shirt */
('1040196', '7500', 'Top'), /* Smile Seed Top */
('1040195', '5600', 'Top'), /* Sleeveless Purple Mustache Shirt (M) */
('1040194', '4900', 'Top'), /* Guys Pineapple Tank top */
('1040193', '5800', 'Top'), /* RED T-shirt */
('1040192', '6400', 'Top'), /* Green Bunny T-Shirt */
('1041005', '6700', 'Top'), /* Pink Mimi Blouse */
('1041001', '6300', 'Top'), /* Blue Sailor Shirt */
('1041000', '8500', 'Top'), /* Blue Frill Blouse */
('1041009', '6400', 'Top'), /* Red Sailor Shirt */
('1041071', '7600', 'Top'), /* Yellow Mimi Blouse */
('1041070', '3600', 'Top'), /* Sky Blue Mimi Blouse */
('1041073', '3500', 'Top'), /* Pre-School Uniform Top */
('1041072', '8700', 'Top'), /* Cowboy Top */
('1041090', '8100', 'Top'), /* Pink Top */
('1041114', '4700', 'Top'), /* Hawaiian Shirt */
('1041113', '8700', 'Top'), /* Pink Frill Pajama Top */
('1041112', '4900', 'Top'), /* Black Trainer Jacket */
('1041111', '8100', 'Top'), /* Pink Trainer Jacket */
('1041110', '4800', 'Top'), /* Sky Blue Trainer Jacket */
('1041109', '7600', 'Top'), /* Red Trainer Jacket */
('1041108', '4000', 'Top'), /* SF Ninja Top */
('1041104', '4300', 'Top'), /* Old School Uniform Top */
('1041135', '4800', 'Top'), /* Tube-Top Jacket */
('1041134', '4400', 'Top'), /* Angora Mustang */
('1041133', '4900', 'Top'), /* Grey Cardigan */
('1041132', '4300', 'Top'), /* Pink Frill Camisole */
('1041131', '3600', 'Top'), /* Pink Ribboned Janie */
('1041130', '6500', 'Top'), /* Blue Frill Camisole */
('1041129', '3700', 'Top'), /* Yellow Frill Camisole */
('1041128', '5000', 'Top'), /* Cross Sleeveless */
('1041127', '8600', 'Top'), /* Heart Sleeveless */
('1041126', '4200', 'Top'), /* Skull T-Shirt */
('1041125', '6500', 'Top'), /* Rainbow Knit */
('1041147', '4500', 'Top'), /* Muscle Man */
('1041146', '7500', 'Top'), /* Old School Blazer [F] */
('1041144', '3600', 'Top'), /* Retro School Uniform Jacket */
('1041143', '3900', 'Top'), /* Green Tie Casual Suit */
('1041142', '8500', 'Top'), /* Ribbon Frilled top */
('1041140', '4900', 'Top'), /* Island Beads (F) */
('1041139', '4000', 'Top'), /* Mercury Leather Jacket (F) */
('1041138', '6500', 'Top'), /* Tania Bolero */
('1041137', '8300', 'Top'), /* Pink-Dotted Top */
('1041136', '5500', 'Top'), /* Pink Vest Blouse */
('1041156', '7000', 'Top'), /* Pre-School Top */
('1041199', '6200', 'Top'), /* Lalala Pink T-shirt */
('1041198', '3900', 'Top'), /* Smile Seed Top */
('1041197', '4600', 'Top'), /* Pink Mustache T-Shirt (F) */
('1041196', '6800', 'Top'), /* Girls Pineapple Tank top */
('1041195', '7400', 'Top'), /* RED T-shirt */
('1041194', '4500', 'Top'), /* Pink Bunny T-Shirt */
('1060001', '3900', 'Bottom'), /* Black Suit Pants */
('1060003', '4500', 'Bottom'), /* Military Shorts */
('1060048', '4400', 'Bottom'), /* Green Disco Pants */
('1060049', '7800', 'Bottom'), /* Blue Disco Pants */
('1060053', '8200', 'Bottom'), /* Wild Pants */
('1060054', '4800', 'Bottom'), /* Brown Wild Pants */
('1060055', '5700', 'Bottom'), /* Red Wild Pants */
('1060034', '8700', 'Bottom'), /* Blue Rider Pants */
('1060035', '8100', 'Bottom'), /* Shine Rider Pants */
('1060036', '8500', 'Bottom'), /* Dark Rider Pants */
('1060040', '4300', 'Bottom'), /* Blue Trainer Pants */
('1060041', '5200', 'Bottom'), /* Green Trainer Pants */
('1060042', '7200', 'Bottom'), /* Orange Trainer Pants */
('1060047', '4200', 'Bottom'), /* Original Disco Pants */
('1060066', '5600', 'Bottom'), /* Cowboy Pants */
('1060067', '5200', 'Bottom'), /* Pre-School Pants */
('1060112', '6200', 'Bottom'), /* Prep School Uniform Pants */
('1060113', '5800', 'Bottom'), /* Blue Leggings */
('1060114', '4900', 'Bottom'), /* Washed Jeans */
('1060116', '7600', 'Bottom'), /* Military Cargo Shorts */
('1060117', '4700', 'Bottom'), /* Tropical Shorts */
('1060118', '6100', 'Bottom'), /* Orange Puffy Pants */
('1060119', '5800', 'Bottom'), /* Denim Wrinkled Skirt */
('1060120', '5800', 'Bottom'), /* Tania Tartan Pants */
('1060121', '8500', 'Bottom'), /* Mercury Washed Jeans */
('1060122', '6300', 'Bottom'), /* Pink Miniskirt */
('1060123', '4000', 'Bottom'), /* Blue Sailor Skirt */
('1060125', '8700', 'Bottom'), /* Blue Skirt (m) */
('1060126', '5100', 'Bottom'), /* Black Wakeboard Pants */
('1060096', '8400', 'Bottom'), /* Old School Uniform Pants */
('1060103', '8100', 'Bottom'), /* Hawaiian Skirt */
('1060108', '3800', 'Bottom'), /* Torn-Up Jeans */
('1060145', '7200', 'Bottom'), /* Pre-School Pants */
('1060139', '7900', 'Bottom'), /* Retro School Uniform Pants */
('1060178', '5200', 'Bottom'), /* [MS Custom] Orange Trainer Pants */
('1060179', '4900', 'Bottom'), /* Golf Shorts */
('1060180', '6700', 'Bottom'), /* Puffy Puff Pants */
('1060181', '4800', 'Bottom'), /* Star Shorts */
('1060182', '8500', 'Bottom'), /* Golf Shorts */
('1060187', '8500', 'Bottom'), /* Green Rolled-Up Shorts */
('1060188', '5000', 'Bottom'), /* White Hot Pants */
('1060189', '6800', 'Bottom'), /* Smile Seed Pants */
('1060190', '5700', 'Bottom'), /* Lalala Dot Pants */
('1060174', '6200', 'Bottom'), /* Cowboy Pants */
('1061000', '5000', 'Bottom'), /* Blue Bell Dress */
('1061001', '3700', 'Bottom'), /* Blue Sailor Skirt */
('1061004', '8500', 'Bottom'), /* Pink Miniskirt */
('1061005', '8900', 'Bottom'), /* Roll-Up Jean */
('1061007', '7500', 'Bottom'), /* Red Sailor Skirt */
('1061072', '3700', 'Bottom'), /* Red Trainer Pants */
('1061073', '7400', 'Bottom'), /* Sky Blue Trainer Pants */
('1061074', '3300', 'Bottom'), /* Pink Trainer Pants */
('1061075', '4800', 'Bottom'), /* Black Trainer Pants */
('1061065', '3600', 'Bottom'), /* Sky Blue Miniskirt */
('1061066', '6200', 'Bottom'), /* Yellow Mimi Skirt */
('1061067', '8100', 'Bottom'), /* Cowboy Pants */
('1061068', '5700', 'Bottom'), /* Pre-School Uniform Skirt */
('1061107', '7600', 'Bottom'), /* SF Ninja Pants */
('1061108', '3300', 'Bottom'), /* Red Training Shorts */
('1061109', '6900', 'Bottom'), /* Sky Blue Training Shorts */
('1061110', '8400', 'Bottom'), /* Pink Training Shorts */
('1061111', '6500', 'Bottom'), /* Black Training Shorts */
('1061112', '3900', 'Bottom'), /* Pink Frill Pajama Bottom */
('1061113', '4100', 'Bottom'), /* Hawaiian Skirt */
('1061089', '8500', 'Bottom'), /* Blue Skirt */
('1061103', '3600', 'Bottom'), /* Old School Uniform (Skirt) */
('1061136', '8400', 'Bottom'), /* Long Khaki Skirt */
('1061137', '3900', 'Bottom'), /* Dark Denim Skirt */
('1061138', '4100', 'Bottom'), /* Pink Heart Hot Pants */
('1061139', '3600', 'Bottom'), /* Military Cargo Shorts */
('1061140', '3600', 'Bottom'), /* Denim Skirt & Striped Sox */
('1061141', '7500', 'Bottom'), /* Tania Tartan Skirt */
('1061142', '4100', 'Bottom'), /* Mercury Jean Skirt */
('1061143', '5400', 'Bottom'), /* Amorian Pink Skirt */
('1061144', '8400', 'Bottom'), /* Blue Jeans */
('1061145', '7500', 'Bottom'), /* Retro School Uniform Pants */
('1061147', '3500', 'Bottom'), /* Old School Uniform Pants (F) */
('1061148', '7400', 'Bottom'), /* Pink Frill Swim Skirt */
('1061124', '7800', 'Bottom'), /* Red Leggings */
('1061126', '5200', 'Bottom'), /* Plitz Skirt */
('1061127', '8800', 'Bottom'), /* Blue Diamond Bootcuts */
('1061128', '4100', 'Bottom'), /* Pink Diamond Bootcuts */
('1061129', '5300', 'Bottom'), /* Butterfly Skirt */
('1061130', '7700', 'Bottom'), /* Green Long Skirt */
('1061131', '8400', 'Bottom'), /* Blue Slit Skirt */
('1061132', '5900', 'Bottom'), /* Skirt with Tights */
('1061133', '7000', 'Bottom'), /* Orange Long Skirt */
('1061134', '8400', 'Bottom'), /* Denim Miniskirt */
('1061135', '5700', 'Bottom'), /* Pink Layered Skirt */
('1061170', '4900', 'Bottom'), /* Bright Frilly Shorts */
('1061166', '7000', 'Bottom'), /* Pre-School Skirt */
('1061203', '8800', 'Bottom'), /* Puffy Puff Dress */
('1061204', '4200', 'Bottom'), /* Golf Skirt */
('1061206', '3800', 'Bottom'), /* Golf Skirt */
('1061207', '8300', 'Bottom'), /* Star Skirt */
('1061210', '8100', 'Bottom'), /* Check Skirt */
('1061211', '5700', 'Bottom'), /* Green Skirt */
('1061212', '6300', 'Bottom'), /* White Hot Pants */
('1061213', '3900', 'Bottom'), /* Smile Seed Skirt */
('1061214', '7400', 'Bottom'), /* Lalala Dot Skirt */
('1012030', '6100', 'Face'), /* Eye Scar */
('1012029', '6100', 'Face'), /* Jester Mask */
('1012028', '6600', 'Face'), /* Blush */
('1012027', '4200', 'Face'), /* Bandage Strip */
('1012026', '5500', 'Face'), /* Guan Yu Beard */
('1012025', '4800', 'Face'), /* War Paint */
('1012024', '4800', 'Face'), /* Gentleman's Mustache */
('1012023', '5600', 'Face'), /* Yellow Kabuki Mask */
('1012022', '6200', 'Face'), /* Red Kabuki Mask */
('1012021', '5100', 'Face'), /* White Kabuki Mask */
('1012043', '5000', 'Face'), /* Australia Face Painting */
('1012042', '5500', 'Face'), /* Aztec Paint (Mexico) */
('1012041', '5600', 'Face'), /* Star Spangled Paint (USA) */
('1012040', '6700', 'Face'), /* Heart Face Painting */
('1012039', '5400', 'Face'), /* Taegeuk Paint (Korea) */
('1012038', '5800', 'Face'), /* Rising Sun Paint (Japan) */
('1012037', '6000', 'Face'), /* Armillary Shield Paint (Portugal) */
('1012036', '4700', 'Face'), /* Bundes Paint (Germany) */
('1012035', '6300', 'Face'), /* Brazillian Paint (Brazil) */
('1012034', '6500', 'Face'), /* Tri-color Paint (France) */
('1012033', '4900', 'Face'), /* England Face Painting */
('1012032', '4300', 'Face'), /* White Bread */
('1012063', '4200', 'Face'), /* Kitty Paint */
('1012062', '4500', 'Face'), /* Mild Pink Lipstick */
('1012056', '4800', 'Face'), /* Doggy Mouth */
('1012055', '6000', 'Face'), /* Allergic Reaction */
('1012054', '6100', 'Face'), /* Purple Rage */
('1012053', '5000', 'Face'), /* Unmanaged Anger */
('1012052', '6100', 'Face'), /* Tongue Twister Scroll */
('1012051', '6700', 'Face'), /* Dark Jester */
('1012050', '4500', 'Face'), /* Maple-Stein Face */
('1012049', '5700', 'Face'), /* Ogre Mask */
('1012048', '4400', 'Face'), /* Dark Jack's Scar */
('1012075', '5300', 'Face'), /* Cold Sweat */
('1012074', '4800', 'Face'), /* Mocking Laughter */
('1012090', '4800', 'Face'), /* Facial Powder */
('1012085', '6700', 'Face'), /* Cherry Bubblegum */
('1012083', '6400', 'Face'), /* Dollish Pink */
('1012082', '5400', 'Face'), /* Ice Cold Red */
('1012081', '4700', 'Face'), /* MV Mask */
('1012080', '4900', 'Face'), /* Fat Lips */
('1012105', '4900', 'Face'), /* Super Sucker */
('1012100', '5500', 'Face'), /* Facial Powder(red) */
('1012099', '5100', 'Face'), /* Facial Powder(blue) */
('1012097', '4900', 'Face'), /* Purple Noisemaker */
('1012096', '4200', 'Face'), /* Apple Bubble Gum */
('1012127', '6200', 'Face'), /* Crescent Paint (Singapore) */
('1012126', '4500', 'Face'), /* Yellow Star Paint (Vietnam) */
('1012125', '4900', 'Face'), /* Chakra Paint (Thailand) */
('1012124', '6500', 'Face'), /* Union Paint (UK) */
('1012123', '5100', 'Face'), /* Holland Paint (Netherlands) */
('1012122', '5300', 'Face'), /* Gold Nordic Paint (Sweden) */
('1012121', '6700', 'Face'), /* Coat of Arms Paint (Spain) */
('1012114', '4200', 'Face'), /* 5-Starred Red Paint (China) */
('1012113', '5800', 'Face'), /* ROC Paint (Taiwan) */
('1012112', '4700', 'Face'), /* Bauhinia Paint (Hong Kong) */
('1012129', '4800', 'Face'), /* Maple Leaf Paint  (Canada) */
('1012128', '5700', 'Face'), /* Jalur Gemilang Paint (Malaysia) */
('1012390', '6000', 'Face'), /* Peruvian Flag Face Paint */
('1012509', '4700', 'Eye'), /* Hange's Glasses */
('1112000', '8000', 'Ring'), /* Sparkling Ring */
('1112001', '9400', 'Ring'), /* Crush Ring */
('1112002', '11600', 'Ring'), /* Cloud Ring */
('1112003', '7400', 'Ring'), /* Cupid Ring */
('1112005', '11700', 'Ring'), /* Venus Fireworks */
('1112006', '6300', 'Ring'), /* Crossed Hearts */
('1112007', '7900', 'Ring'), /* Mistletoe Crush Ring */
('1112012', '7500', 'Ring'), /* Rose Crush Ring */
('1112013', '13100', 'Ring'), /* Firery Love String Couple Ring */
('1112014', '12000', 'Ring'), /* Flaming Red Lips Ring */
('1112015', '7800', 'Ring'), /* Illumination Couples Ring */
('1112112', '7300', 'Ring'), /* Beach Label Ring */
('1112113', '13800', 'Ring'), /* Chocolate Label Ring */
('1112114', '13900', 'Ring'), /* Pink Candy Label Ring */
('1112115', '6600', 'Ring'), /* MapleBowl Label Ring  */
('1112116', '6800', 'Ring'), /* White Cloud Label Ring */
('1112117', '13800', 'Ring'), /* Rainbow Label Ring */
('1112118', '12400', 'Ring'), /* Rainbow Label RingaCoke Label Ring */
('1112119', '10000', 'Ring'), /* Coke (Red) Label Ring */
('1112120', '7500', 'Ring'), /* Coke (White) Label Ring */
('1112121', '9100', 'Ring'), /* Gingerman Label Ring */
('1112122', '11700', 'Ring'), /* Deluxe Rainbow Label Ring */
('1112123', '7000', 'Ring'), /* Red Pencil Label Ring */
('1112124', '12500', 'Ring'), /* Blue Pencil Label Ring */
('1112125', '13800', 'Ring'), /* Green Pencil Label Ring */
('1112126', '11200', 'Ring'), /* Brown Teddy Label Ring */
('1112127', '12400', 'Ring'), /* Welcome Back Ring */
('1112100', '12800', 'Ring'), /* White Label Ring */
('1112101', '12300', 'Ring'), /* Blue Label Ring */
('1112102', '9100', 'Ring'), /* Blue Label Ring 2 */
('1112103', '6700', 'Ring'), /* The Legendary Gold Ring */
('1112104', '9800', 'Ring'), /* Bubbly Label Ring */
('1112105', '13400', 'Ring'), /* Pink-Ribboned Label Ring */
('1112106', '11200', 'Ring'), /* Blue-Ribboned Label Ring */
('1112107', '11300', 'Ring'), /* Skull Label Ring */
('1112108', '10400', 'Ring'), /* Butterfly Label Ring */
('1112109', '10300', 'Ring'), /* Scoreboard Label Ring */
('1112110', '6800', 'Ring'), /* SK Basketball Team Label Ring */
('1112111', '13400', 'Ring'), /* KTF Basketball Team Label Ring */
('1701000', '8400', 'Weapon'), /* Elizabeth Fan */
('1702009', '16000', 'Weapon'), /* Tiger Paw */
('1702008', '13800', 'Weapon'), /* Santa Sack */
('1702011', '10300', 'Weapon'), /* Pink Toy Hammer */
('1702010', '8800', 'Weapon'), /* Orange Toy Hammer */
('1702013', '5500', 'Weapon'), /* Teddy Bear */
('1702012', '10000', 'Weapon'), /* Yellow Spatula */
('1702015', '13700', 'Weapon'), /* Bug Net */
('1702014', '5600', 'Weapon'), /* Toy RIfle */
('1702001', '18800', 'Weapon'), /* Bouquet */
('1702000', '6000', 'Weapon'), /* Dual Plasma Blade */
('1702003', '8000', 'Weapon'), /* Plastic Slingshot */
('1702002', '12100', 'Weapon'), /* Wooden Slingshot */
('1702005', '17800', 'Weapon'), /* Yellow Candy Cane */
('1702004', '7800', 'Weapon'), /* Angel Wand */
('1702007', '7100', 'Weapon'), /* Green Candy Cane */
('1702006', '9400', 'Weapon'), /* Red Candy Cane */
('1702041', '15500', 'Weapon'), /* Horoscope Sword */
('1702040', '18800', 'Weapon'), /* Horoscope Bow */
('1702043', '17100', 'Weapon'), /* Poo Stick */
('1702042', '7100', 'Weapon'), /* Microphone */
('1702045', '15200', 'Weapon'), /* Sunflower Stalk */
('1702044', '14300', 'Weapon'), /* Toy Machine Gun */
('1702046', '17300', 'Weapon'), /* Horoscope Crossbow */
('1702033', '14200', 'Weapon'), /* Sun Quan Staff */
('1702032', '16600', 'Weapon'), /* Zhu-Ge-Liang Wand */
('1702035', '5600', 'Weapon'), /* Cao Cao Bow */
('1702034', '15500', 'Weapon'), /* Guan Yu Spear */
('1702037', '19000', 'Weapon'), /* Coffee Pot */
('1702036', '13600', 'Weapon'), /* Witch's Broomstick */
('1702039', '6100', 'Weapon'), /* Horoscope Net */
('1702038', '16200', 'Weapon'), /* Horoscope Claw */
('1702025', '6000', 'Weapon'), /* Cherub's Bow */
('1702024', '8700', 'Weapon'), /* Cupid's Bow */
('1702027', '13900', 'Weapon'), /* Blazing Sword */
('1702026', '6600', 'Weapon'), /* Cupid's Crossbow */
('1702029', '16500', 'Weapon'), /* White Rabbit's Foot */
('1702028', '11600', 'Weapon'), /* Donut */
('1702031', '10700', 'Weapon'), /* Liu Bei Sword */
('1702030', '12700', 'Weapon'), /* Diao Chan Sword */
('1702017', '5800', 'Weapon'), /* Pink Rabbit Puppet */
('1702016', '9300', 'Weapon'), /* Picnic Basket */
('1702019', '14100', 'Weapon'), /* Pillow */
('1702018', '13900', 'Weapon'), /* Vanilla Ice Cream */
('1702021', '18000', 'Weapon'), /* Black Electric Guitar */
('1702020', '10600', 'Weapon'), /* Lollipop */
('1702023', '18900', 'Weapon'), /* Green Electric Guitar */
('1702022', '7200', 'Weapon'), /* Brown Electric Guitar */
('1702073', '6300', 'Weapon'), /* Blue Shiner Crossbow */
('1702072', '15500', 'Weapon'), /* Laser Sword */
('1702075', '10400', 'Weapon'), /* USA Cheer Towel */
('1702074', '8500', 'Weapon'), /* Pink Shiner Crossbow */
('1702077', '8400', 'Weapon'), /* Australia Cheer Towel */
('1702076', '5600', 'Weapon'), /* Mexico Cheer Towel */
('1702079', '5800', 'Weapon'), /* Blue Blazing Sword */
('1702078', '19300', 'Weapon'), /* Fairy Fan */
('1702065', '11300', 'Weapon'), /* Paper Stick */
('1702064', '15600', 'Weapon'), /* Rock Stick */
('1702067', '5100', 'Weapon'), /* England Cheer Towel */
('1702066', '4900', 'Weapon'), /* Canvas Tote Bag */
('1702069', '16600', 'Weapon'), /* Brazil Cheer Towel */
('1702068', '15200', 'Weapon'), /* France Cheer Towel */
('1702071', '16100', 'Weapon'), /* Japan Cheer Towel */
('1702070', '7900', 'Weapon'), /* Sporty Band */
('1702057', '13800', 'Weapon'), /* Blue Guitar */
('1702056', '16600', 'Weapon'), /* Guitar */
('1702059', '9500', 'Weapon'), /* Cactus */
('1702058', '11800', 'Weapon'), /* Big Hand */
('1702061', '13300', 'Weapon'), /* Red Fist of Fury */
('1702060', '9500', 'Weapon'), /* Shiner */
('1702063', '17900', 'Weapon'), /* Scissor Stick */
('1702062', '11500', 'Weapon'), /* Blue Fist of Fury */
('1702049', '8700', 'Weapon'), /* Snowman Claw */
('1702048', '10100', 'Weapon'), /* Green Wash Cloth */
('1702051', '15100', 'Weapon'), /* Hong Bao */
('1702050', '7600', 'Weapon'), /* Cellphone */
('1702053', '14400', 'Weapon'), /* In-Hand FB Helmet(Away) */
('1702052', '12600', 'Weapon'), /* In-Hand FB Helmet(Home) */
('1702055', '12400', 'Weapon'), /* Ancient Korean Bow */
('1702054', '10500', 'Weapon'), /* Football Claw */
('1702105', '9500', 'Weapon'), /* Heart Key */
('1702104', '10600', 'Weapon'), /* Deluxe Cone */
('1702107', '18200', 'Weapon'), /* Chocolate */
('1702106', '15000', 'Weapon'), /* Melting Chocolate */
('1702108', '7200', 'Weapon'), /* Giant Lollipop */
('1702097', '14900', 'Weapon'), /* Fire Katana */
('1702096', '13900', 'Weapon'), /* Pizza Pan */
('1702098', '8400', 'Weapon'), /* Violin */
('1702101', '12400', 'Weapon'), /* Meso Gunner */
('1702100', '16600', 'Weapon'), /* Christmas Bell */
('1702103', '13900', 'Weapon'), /* Pink Ribbon Umbrella */
('1702102', '5900', 'Weapon'), /* Starblade */
('1702089', '18500', 'Weapon'), /* Candy Hammer */
('1702088', '11100', 'Weapon'), /* Super Scrubber */
('1702091', '8900', 'Weapon'), /* Tennis Racquet */
('1702090', '6800', 'Weapon'), /* Feather Scimitar */
('1702093', '10200', 'Weapon'), /* Okie Donkie */
('1032234', '6500', 'Earrings'), /* Cold-hearted Earrings */
('1032233', '4300', 'Earrings'), /* Warm-hearted Earrings */
('1032228', '6400', 'Earrings'), /* Halloweenroid Sensor */
('1032260', '6400', 'Earrings'), /* Golden Bell Drops */
('1032029', '6300', 'Earrings'), /* Silver Earrings */
('1032038', '6600', 'Earrings'), /* Snow Earrings */
('1032036', '5300', 'Earrings'), /* Beaded Cross Earrings */
('1032034', '4800', 'Earrings'), /* Coke Earrings */
('1032063', '6100', 'Earrings'), /* Wireless Headset */
('1032054', '4800', 'Earrings'), /* Rainbow Earrings */
('1032053', '5400', 'Earrings'), /* Clover Earrings */
('1032052', '4800', 'Earrings'), /* Slime Earrings */
('1032051', '4900', 'Earrings'), /* Diamond Earrings */
('1032074', '5300', 'Earrings'), /* Heart Rainbow Earrings */
('1032073', '5200', 'Earrings'), /* Wind Bell Earrings */
('1032072', '5600', 'Earrings'), /* Shiny Altair Earrings */
('1032071', '6100', 'Earrings'), /* Altair Earrings */
('1032138', '5200', 'Earrings'), /* Dragon Spirit Earrings */
('1032145', '6600', 'Earrings'), /* Crab Earrings */
('1032175', '4800', 'Earrings'), /* Faraway Earring */
('1082102', '34700', 'Transparent'), /* Transparent Gloves */
('1002186', '55600', 'Transparent'), /* Transparent Hat */
('1003276', '43300', 'Transparent'), /* Blue Heart Transparent Hat */
('1003271', '48800', 'Transparent'), /* Pink Heart Transparent Hat */
('1102039', '51000', 'Transparent'), /* Transparent Cape */
('1003900', '53700', 'Transparent'), /* Blue Heart Transparent Hat */
('1004109', '60800', 'Transparent'), /* Transparent Hat */
('1092056', '69100', 'Transparent'), /* Transparent Shield */
('1092064', '42900', 'Transparent'), /* Transparent Shield */
('1092067', '36000', 'Transparent'), /* Transparent Shield */
('1012057', '39900', 'Transparent'), /* Transparent Face Accessory */
('1012104', '43600', 'Transparent'), /* Transparent Face Accessory */
('1012289', '26900', 'Transparent'), /* Transparent Face Accessory */
('1702099', '55400', 'Transparent'), /* Transparent Claw */
('1702224', '59900', 'Transparent'), /* Transparent Weapon */
('1702220', '26900', 'Transparent'), /* Transparent Wand */
('1342069', '33100', 'Transparent'), /* Transparent Katara */
('1702585', '25300', 'Transparent'), /* Universal Transparent Weapon */
('1702653', '32800', 'Transparent'), /* Transparent Arm Cannon */
('1032024', '37900', 'Transparent'), /* Transparent Earrings */
('1072153', '40900', 'Transparent'), /* Transparent Shoes */
('5240000', '12200', 'Pet Food'), /* Monkey Banana */
('5240001', '8200', 'Pet Food'), /* Micro-Chips */
('5240002', '14000', 'Pet Food'), /* Dog Bone */
('5240003', '15400', 'Pet Food'), /* Bamboo */
('5240004', '12600', 'Pet Food'), /* Porgy */
('5240005', '10700', 'Pet Food'), /* Clover */
('5240006', '10700', 'Pet Food'), /* Red Meat */
('5240007', '11900', 'Pet Food'), /* Frozen Fruits */
('5240008', '10700', 'Pet Food'), /* Turkey Feed */
('5240009', '9500', 'Pet Food'), /* Purple Heart Pudding */
('5240010', '9100', 'Pet Food'), /* Golden Coin Chocolate */
('5240011', '13100', 'Pet Food'), /* Cotton Candy */
('5240012', '9800', 'Pet Food'), /* Dragon Marble Candy */
('5240013', '13300', 'Pet Food'), /* Caramel Beetle */
('5240014', '13000', 'Pet Food'), /* Watermelon */
('5240015', '13400', 'Pet Food'), /* Garlic Salt Chips */
('5240017', '11000', 'Pet Food'), /* Snowflake */
('5240018', '12000', 'Pet Food'), /* Sprout */
('5240020', '13100', 'Pet Food'), /* Caviar */
('5240021', '10400', 'Pet Food'), /* Robo Oil */
('5240023', '10600', 'Pet Food'), /* Bread */
('5240024', '12900', 'Pet Food'), /* Pinky DrumStick */
('5240028', '15200', 'Pet Food'), /* Dynamite */
('5240031', '8300', 'Pet Food'), /* Fireball */
('5240022', '14800', 'Pet Food'), /* Little Fruits */
('5240041', '8200', 'Pet Food'), /* Meat */
('5240030', '11800', 'Pet Food'), /* Bread */
('5240032', '13200', 'Pet Food'), /* Caviar */
('5240035', '11400', 'Pet Food'), /* Canned Food */
('5240039', '10400', 'Pet Food'), /* Sugar Lump */
('5240042', '15100', 'Pet Food'), /* Pink Bean's Giant Rib */
('5240043', '9100', 'Pet Food'), /* Corgi Cookie */
('5240033', '11300', 'Pet Food'), /* Unidentified Liquid */
('5240034', '14700', 'Pet Food'), /* Doggy Bone */
('5240040', '11200', 'Pet Food'), /* Flour Sack */
('5240044', '14400', 'Pet Food'), /* Observer Cherry */
('5240047', '11000', 'Pet Food'), /* Star Candy */
('5240049', '13000', 'Pet Food'), /* Blueberry */
('5240053', '14100', 'Pet Food'), /* Bandit Cup Ramen */
('5240054', '13800', 'Pet Food'), /* Veggies */
('5240048', '9700', 'Pet Food'), /* Dragon Food */
('5240050', '10600', 'Pet Food'), /* Fear */
('5240051', '9100', 'Pet Food'), /* Death */
('5240052', '12800', 'Pet Food'), /* Jealousy */
('5240055', '15300', 'Pet Food'), /* Navigator Oyster */
('5240046', '15300', 'Pet Food'), /* Helmsman's Watermelon */
('5240059', '14900', 'Pet Food'), /* Scary Spirit */
('5240060', '12100', 'Pet Food'), /* Mopey Spirit */
('5240061', '14000', 'Pet Food'), /* Jealous Spirit */
('5240065', '8400', 'Pet Food'), /* Milky Way Essence */
('5240067', '14600', 'Pet Food'), /* Shining Tuna */
('5240069', '9400', 'Pet Food'), /* Pink Pudding */
('5240070', '12900', 'Pet Food'), /* Ice Pudding */
('5240071', '14600', 'Pet Food'), /* Red Pudding */
('5240072', '14600', 'Pet Food'), /* Miracle Canned Food */
('5240075', '14200', 'Pet Food'), /* Salad */
('5240045', '15200', 'Pet Food'), /* Harp Seal Formula */
('5240066', '12000', 'Pet Food'), /* Puffram's Cloud Candy */
('5240056', '9100', 'Pet Food'), /* Helmsman's Watermelon */
('5240062', '11700', 'Pet Food'), /* Fortune Cookie */
('5240063', '11100', 'Pet Food'), /* Nectar */
('5240029', '12900', 'Pet Food'), /* Golden Drumstick */
('5240027', '14100', 'Pet Food'), /* Golden Drumstick */
('5240079', '13700', 'Pet Food'), /* Puffram's Cloud Candy */
('5240073', '10300', 'Pet Food'), /* Teddy's Honey Stash */
('5240074', '15100', 'Pet Food'), /* Hot Pumpkin Porridge */
('5240077', '13100', 'Pet Food'), /* Eucalyptus Leaves */
('5240078', '13900', 'Pet Food'), /* Acorn */
('5240086', '10600', 'Pet Food'), /* Gingerbread Crumbs */
('5240084', '8500', 'Pet Food'), /* Roo-bot Recharge Unit */
('5240090', '13300', 'Pet Food'), /* Yeti Fuel */
('5240081', '9100', 'Pet Food'), /* Honey Soul Candy */
('5240082', '10400', 'Pet Food'), /* Lime Soul Candy */
('5240083', '8800', 'Pet Food'), /* Peach Soul Candy */
('5240085', '12700', 'Pet Food'), /* Soul Vial */
('5240087', '15000', 'Pet Food'), /* World Tree Fruit */
('5240088', '12800', 'Pet Food'), /* Ribbit Ribbit */
('5240096', '14500', 'Pet Food'), /* Cleansing Powder */
('5240092', '13000', 'Pet Food'), /* Commander's Corn Dog */
('5240057', '13700', 'Pet Food'), /* Dough */
('5240058', '11300', 'Pet Food'), /* Frostie */
('5240089', '12400', 'Pet Food'), /* Ice Cookie */
('5240091', '10600', 'Pet Food'), /* Dilloberry */
('5240016', '15400', 'Pet Food'), /* Caramel Beetle */
('5240019', '11400', 'Pet Food'), /* Hedgehog Food Is this supposed to be for the Porcupine? */
('5240104', '15500', 'Pet Food'), /* Li'l Lai's Tasty Meat */
('5240105', '12800', 'Pet Food'), /* Li'l Fort's Fresh Fish */
('5240106', '14400', 'Pet Food'), /* Li'l Arby's Crunchy Fish Pastry */
('5240094', '8400', 'Pet Food'), /* Kangaroo Salad */
('5240095', '9900', 'Pet Food'), /* Chestnut Ice Pop */
('5240100', '8700', 'Pet Food'), /* Warm Flame */
('5240101', '14900', 'Pet Food'), /* Unmelting Butter Piece */
('5240102', '10200', 'Pet Food'), /* Dawn Dew */
('5240103', '15200', 'Pet Food'), /* Savory Fish */
('5240110', '14600', 'Pet Food'), /* Bruise's Enhancement Potion */
('5249000', '12400', 'Pet Food'), /* Premium Pet Food */
('5240111', '12700', 'Pet Food'), /* Raw Liver */
('5240112', '9300', 'Pet Food'), /* Chihuahua Chew */
('5240117', '8100', 'Pet Food'), /* Lyn Battery */
('5240118', '8100', 'Pet Food'), /* Hong Battery */
('5240119', '12100', 'Pet Food'), /* Chun Battery */
('5240120', '12600', 'Pet Food'), /* Rainbow Melon */
('5240122', '11000', 'Pet Food'), /* Bobble's Lollipop */
('5240123', '14400', 'Pet Food'), /* Bunny Cookie */
('5240128', '12500', 'Pet Food'), /* New Pink Harp Seal Formula */
('5240130', '8200', 'Pet Food'), /* Guardian Lollipop */
('5240131', '14300', 'Pet Food'), /* Clementine Dew */
('5240132', '8900', 'Pet Food'), /* Friendly Fresh Milk */
('5240133', '11200', 'Pet Food'), /* Macaron Sugar */
('5240134', '8900', 'Pet Food'), /* Seaworthy Sweet */
('5240135', '10100', 'Pet Food'), /* Ducky's Coco Juice */
('5240144', '9100', 'Pet Food'), /* Lingling's Baby Tiger Milk */
('5240145', '10100', 'Pet Food'), /* Nene's Soft Lettuce Leaf */
('5240146', '15000', 'Pet Food'), /* TuTu's Fly */
('5240137', '15100', 'Pet Food'), /* Dessert Flavor */
('5240138', '13600', 'Pet Food'), /* Fire Eye Drop */
('5240140', '8000', 'Pet Food'), /* Heroic Provision */
('5240141', '13400', 'Pet Food'), /* Diamond Candy */
('5240142', '11400', 'Pet Food'), /* Cotton Candy Sugar */
('5240147', '15300', 'Pet Food'), /* Honey Butter Biscuit */
('5240150', '11900', 'Pet Food'), /* Meow Chow */
('5240153', '8000', 'Pet Food'), /* Dream Fragment */
('5240143', '10900', 'Pet Food'), /* Stjartmes Worm */
('5240038', '14000', 'Pet Food'), /* Elephant pet food */
('5240126', '9200', 'Pet Food'), /* Mystical Star Cotton Candy */
('5240093', '10600', 'Pet Food'), /* Pure Dew */
('5240148', '14500', 'Pet Food'), /* Legendary Cherry */
('5240149', '11400', 'Pet Food'), /* Bone-Shaped Chewing Gum */
('5240151', '14400', 'Pet Food'), /* Witch's Fish */
('5240152', '10200', 'Pet Food'), /* Bichon's Premium Pup Chow */
('5190000', '8000', 'Pet Skills'), /* Item Pick-up Skill */
('5190001', '5500', 'Pet Skills'), /* Auto HP Potion Skill */
('5190002', '4100', 'Pet Skills'), /* Expanded Auto Move Skill */
('5190003', '7100', 'Pet Skills'), /* Auto Move Skill */
('5190004', '5100', 'Pet Skills'), /* Expired Pickup Skill */
('5190005', '4300', 'Pet Skills'), /* Ignore Item Skill  */
('5190006', '5800', 'Pet Skills'), /* Auto MP Potion Skill */
('5190010', '7700', 'Pet Skills'), /* Auto Buff Skill */
('5190011', '3500', 'Pet Skills'), /* Auto Feed and Movement Skill */
('5190012', '7200', 'Pet Skills'), /* Fatten Up Skill */
('5190013', '3000', 'Pet Skills'), /* Open Pet Shop Skill */
('5191000', '6800', 'Pet Skills'), /* (-) Delete Item Pick-Up */
('5191001', '6900', 'Pet Skills'), /* (-) Delete HP Charge */
('5191002', '5600', 'Pet Skills'), /* (-)Delete Expand Range */
('5191003', '5400', 'Pet Skills'), /* (-) Delete Automatic Pick-Up */
('5191004', '7900', 'Pet Skills'), /* (-) Delete Pick up Leftover Item & Meso */
('5190009', '6100', 'Pet Skills'), /* Auto All Cure Skill */
('5190014', '6500', 'Pet Skills'), /* Slimming Medicine */
('5062000', '3000', 'Cubes'), /* Miracle Cube */
('5062001', '5000', 'Cubes'), /* Premium Miracle Cube */
('5062009', '6000', 'Cubes'), /* Red Cube */
('5062010', '12000', 'Cubes'), /* Black Cube */
('5062500', '12000', 'Cubes'), /* Bonus Potential Cube */
('5620001', '5000', 'Books'), /* Flying Assaulter 20 Mastery */
('5620002', '7000', 'Books'), /* Mirror Image 20 Mastery */
('5620003', '7000', 'Books'); /* Shadow Meld 20 Mastery */

# Bundle Items:
insert into `cs_items` (`itemID`, `newPrice`, `category`, `bundleQuantity`) values
('5062000', '270000', 'Cubes', '100'), /* Miracle Cube */
('5062001', '450000', 'Cubes', '100'), /* Premium Miracle Cube */
('5062009', '540000', 'Cubes', '100'), /* Red Cube */
('5062010', '1080000', 'Cubes', '100'), /* Black Cube */
('5062500', '1080000', 'Cubes', '100'), /* Bonus Potential Cube */
('5220000', '50000', 'Gachapon Tickets', '10'), /* Gachapon Ticket */
('5220098', '75000', 'Gachapon Tickets', '10'), /* Nebulite Gachapon Ticket */
('5220000', '500000', 'Gachapon Tickets', '100'), /* Gachapon Ticket */
('5220098', '750000', 'Gachapon Tickets', '100'); /* Nebulite Gachapon Ticket */