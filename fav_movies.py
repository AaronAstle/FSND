import fresh_tomatoes
import media

matrix = media.Movie("The Matrix",
        "An elusive figure considered to be the most dangerous man alive, can \
        answer his question -- What is the Matrix?",
        "https://images-na.ssl-images-amazon.com/images/I/51k1epcewKL._AC_UL320_SR214,320_.jpg", #noqa
        "https://www.youtube.com/watch?v=vKQi3bBA1y8")

robin_hood = media.Movie("Robin Hood: Prince of Thieves",
        "When Robin and his Moorish companion come to England and the tyranny\
        of the Sheriff of Nottingham, he decides to fight back as an outlaw.",
        "https://images-na.ssl-images-amazon.com/images/I/51Q09JK4QNL._SY445_.jpg", #noqa
        "https://www.youtube.com/watch?v=fhz5aB-u77Q")

pianist = media.Movie("The Pianist",
        "A Polish Jewish musician struggles to survive the destruction of the\
        Warsaw ghetto of World War II.",
        "http://www.movieposters101.com/gallery/Hollywood/2003/The_Pianist/2013/7/11/The_Pianist_2003_Movie_Poster_5_nrlkw_movieposters101(com).jpg", #noqa
        "https://www.youtube.com/watch?v=BFwGqLa_oAo")

logan = media.Movie("Logan",
        "In the near future, a weary Logan cares for an ailing Professor X in\
         a hide out on the Mexican border. ",
        "https://upload.wikimedia.org/wikipedia/en/3/37/Logan_2017_poster.jpg", #noqa
        "https://www.youtube.com/watch?v=DekuSxJgpbY")

madmax = media.Movie("Mad Max: Fury Road",
        "Haunted by his turbulent past, Mad Max (Tom Hardy) believes the best\
         way to survive is to wander alone.",
        "https://www.movieposter.com/posters/archive/main/201/MPW-100532.jpg", #noqa
        "https://www.youtube.com/watch?v=hEJnMQG9ev8")

martian = media.Movie("The Martian",
        "During a manned mission to Mars, Astronaut Mark Watney is presumed\
         dead after a fierce storm and left behind by his crew.",
        "https://images-na.ssl-images-amazon.com/images/I/A1SU7U7mFXL._SY550_.jpg", #noqa
        "https://www.youtube.com/watch?v=ErkgC-8BfnE")

# Set movies list before creating HTML page
movies = [matrix, robin_hood, pianist, logan, madmax, martian]

# Create HTML page through Fresh_tomoatoes
fresh_tomatoes.open_movies_page(movies)
