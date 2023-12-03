### United Scraper
<br>
This is the United scraper, each one resides in its own folder. The scraper is responsible for scraping the data from the website and saving it to a file. The file is then read by the parser and the data is inserted into the ~~database~~.

### How to Run
Create a new instance of the ```UnitedScraper``` class and call the ```scrape``` method.
The ```scrape``` method returns a promise that resolves to the data object.

### Expected Output
```javascript
{
  flightInfo1:{
    'Departure Time': '12:00 PM',
    'Arrival Time': '12:00 PM',
    'Economy': 'value',
    'Premium Economy': 'value',
    'Business': 'value',
    'Taxes & Fees': 'value'
  }
  flightInfo2:{
  ...
  }}
  

```

>[!NOTE]
>
>/** example URL https://www.united.com/en/us/fsr/choose-flights?f=SFO&t=LGA&d=2024-01-26&tt=1&at=1&sc=7&px=1&taxng=1&newHP=True&clm=7&st=bestmatches&tqp=A
>* f=SFO: This is the departure airport code. In this case, SFO stands for San Francisco International Airport.
>* t=LGA: This is the arrival airport code. LGA stands for LaGuardia Airport in New York.
>* d=2024-01-26: This is the departure date for the flight, formatted as YYYY-MM-DD.
>* tt=1: trip type. The value 1 indicates a one-way trip.
>* at=1: adults traveling.
>* sc=7: ???
>* px=1: Passenger Count? The value 1 indicates one passenger.
>* taxng=1: taxes and fees are included in the price.
>* newHP=True: A flag, indicating the use of a new homepage or layout.
>* clm=7: ???
>* st=bestmatches: This parameter could indicate the sorting order of the search results. In this case, it might be sorted by the best matches.
>* tqp=A: I have no IDEA, it gets appended to the end of the URL no matter what.
>  */
