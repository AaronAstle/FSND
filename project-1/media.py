import webbrowser


class Movie():
    """Movie Class - Basic structure of the Movies

    movie_title     (str): String of Movie Title
    movie_storyline (str): String containing a short description of the movie
    poster_image    (str): String of URL to movie poster
    trailer_youtube (str): String of URL to youtube trailer
    """
    def __init__(self,
                 movie_title, movie_storyline,
                 poster_image, trailer_youtube):
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
