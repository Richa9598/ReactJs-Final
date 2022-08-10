module.exports = {
    allDestinations : "SELECT * FROM destinations",
    destinationById : "SELECT * FROM destinations where id = ",
    allgallery : "SELECT * FROM destinations",

    listingsAllDestinations: "SELECT t.id trip, d.id des_id, d.des_name, d.des_distance, d.des_rating, h.hotel_name, h.hotel_rating, h.hotel_price, tp.t_name, tp.t_price, tp.t_rating, tp.t_description, tp.t_capacity, s.site_name, s.site_description, s.site_rating, s.site_price, s.img_url FROM trips t left join trip_sites ts on t.id = ts.trip_id left join destinations d on t.des_id = d.id left join hotels h on t.hotel_id = h.id left join transports tp on t.t_id = tp.id left join sites s on ts.site_id = s.id ",
    

    listingsByDestinationsId: "SELECT t.id trip, d.id des_id, d.des_name, d.des_distance, d.des_rating, h.hotel_name, h.hotel_rating, h.hotel_price, tp.t_name, tp.t_price, tp.t_rating, tp.t_description, tp.t_capacity, s.site_name, s.site_description, s.site_rating, s.site_price, s.img_url FROM trips t left join trip_sites ts on t.id = ts.trip_id left join destinations d on t.des_id = d.id left join hotels h on t.hotel_id = h.id left join transports tp on t.t_id = tp.id left join sites s on ts.site_id = s.id where d.id = ",
    listingsByListingId: "SELECT t.id trip, d.id des_id, d.des_name, d.des_distance, d.des_rating, h.hotel_name, h.hotel_rating, h.hotel_price, tp.t_name, tp.t_price, tp.t_rating, tp.t_description, tp.t_capacity, s.site_name, s.site_description, s.site_rating, s.site_price, s.img_url FROM trips t left join trip_sites ts on t.id = ts.trip_id left join destinations d on t.des_id = d.id left join hotels h on t.hotel_id = h.id left join transports tp on t.t_id = tp.id left join sites s on ts.site_id = s.id where t.id = ",
    listingsByListingImagesId: "SELECT t.id trip, d.id des_id, d.des_name, d.des_distance, d.des_rating, h.hotel_name, h.hotel_rating, h.hotel_price, tp.t_name, tp.t_price, tp.t_rating, tp.t_description, tp.t_capacity, s.site_name, s.site_description, s.site_rating, s.site_price, s.img_url FROM trips t left join trip_sites ts on t.id = ts.trip_id left join destinations d on t.des_id = d.id left join hotels h on t.hotel_id = h.id left join transports tp on t.t_id = tp.id left join sites s on ts.site_id = s.id where t.id = "

    
}