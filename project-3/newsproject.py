#!/usr/bin/env python3
"""
    This is a short String for docstring
"""

import psycopg2

DBNAME = "news"


def get_results(query):
    """
    Databse connection and query for the result.
    """
    try:
        database = psycopg2.connect(database=DBNAME)
        cursor = database.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        database.close()
        return result
    except:
        print("Connection to Database Failed")


def get_most_popular():
    """
    Return top three articles
    """
    articles = get_results("""
        SELECT title,count(*) AS num
        FROM articles,log
        WHERE log.path ~ articles.slug
        GROUP BY articles.title
        ORDER BY num DESC
        LIMIT 3;
        """)
    return articles


def get_popular_authors():
    """
    Return top three authors
    """
    top_authors = get_results("""
        SELECT authors.name, count(*) AS view_num
        FROM articles
        INNER JOIN authors
        ON articles.author = authors.id
        INNER JOIN log
        ON log.path
        LIKE concat('%', articles.slug, '%')
        WHERE log.status
        LIKE '%200%'
        GROUP BY authors.name
        ORDER BY view_num DESC;
        """)
    return top_authors


def get_top_errorday():
    """
    Return the day with the most errors
    
    Github @sagarchoudhary96 was used a reference.
    Due to me being stuck on the CASE statement.
    """
    error_days = get_results("""
        SELECT * FROM (
        SELECT date(time), round(SUM(
            CASE log.status
            WHEN '%200%'
            THEN 0 ELSE 1
            END) * 100 / count(log.status), 2)
            AS error_perc
            FROM log GROUP BY date(time)
            ORDER BY error_perc DESC)
            AS errors
            WHERE error_perc > 1;
        """)
    return error_days


def print_query_results(query_results, title):
    """ Write results in to file

    Args:
        query_results: list of results
        title: String title of incoming results
    """
    f.write(title)
    for index, results in enumerate(query_results):
        line = index+1
        f.write(
            "\t{0}. {1} --- {2} views.\n".format(line, results[0], results[1]))


def print_error_result(day_errors, title):
    """ Write results in to file

    Args:
        day_errors: list of days with errors above 1%
        title: String title of incoming results
    """
    f.write(title)
    for result in day_errors:
        f.write(
            "\t- {0}% of errors on {1}".format(
                result[1], result[0].strftime("%B %d, %Y")))


popular_articles = get_most_popular()
popular_authors = get_popular_authors()
day_errors = get_top_errorday()

f = open("newsproject.txt", "w+")

print_query_results(popular_articles, "Popular Articles \n==========\n")
print_query_results(popular_authors, "\nPopular Authors \n==========\n")
print_error_result(
    day_errors, "\nDates with more that 1% error rate \n==========\n")

f.close()

print("""
    Please open in newsproject.txt in your favorite text editor/viewer.
    If you wish to view from the CLI type \"less newsproject.txt\" to view.
    """)
