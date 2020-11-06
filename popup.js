/*
Global variables
*/
AUTHORIZED_URLS = [
  "https://www.auchandrive.fr/",
  "https://www.auchan.fr/"
]
HISTORY_RANGE = "30days"


/*
Product price history
*/
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  if (AUTHORIZED_URLS.some(v => tabs[0].url.includes(v))) {
    let product_url_tmp = tabs[0].url.split('-')
    let product_code = product_url_tmp[product_url_tmp.length-1];
    var location_code = document.getElementsByClassName("context-header__pos");
/*
    var tmp;
    chrome.storage.local.get(['location_code'], function(result) {
      console.log('Value currently is ' + result.location_code);
      tmp = result.location_code
      alert(result.location_code);
    });
*/
    
    fetch('http://localhost:8080/api/auchan/product?' +
          '&id=' + product_code +
          '&range=' + HISTORY_RANGE +
          '&company=' + 'auchan' +
          '&store=' + 'englos' +
          '&distance_max=' + 50
          )
      .then(r => r.text()).then(result => {
        chrome.storage.local.set(
          {
            'price_history': result
          }
        );

        chrome.storage.local.get(['price_history'], function(result) {
          data = JSON.parse(result['price_history'])

          chartColors = [
          'rgb(255, 99, 132)', // red
          'rgb(255, 159, 64)', // orange
          'rgb(255, 205, 86)', // yellow
          'rgb(75, 192, 192)', // green
          'rgb(54, 162, 235)', // blue
          'rgb(153, 102, 255)', // purple
          'rgb(201, 203, 207)' // grey
          ]

          locations = Object.keys(data["history"]["location"])
          var datasets = Array();
          locations.forEach(function(location, index) {
            datasets.push(
              {
                label: data["history"]["location"][location]["name"],
                //steppedLine: "before",
                borderColor: chartColors[index%(chartColors.length)],
                fill: false,

                data: data["history"]["location"][location]["price"]
              }
            )
          })

          var config = {
            type: 'line',
            data: {
              datasets: datasets,
            },
            options: {
              responsive: true,
              title: {
                  display: true,
                  text: "Evolution des prix"
              },
              tooltips: {
                mode: 'index',
                intersect: false
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'linear',
                  //distribution: 'series',
                  bounds: 'ticks',
                  time: {
                    parser: 'YYYY-MM-DD kk:mm:ss',
                    //unit: 'day',
                    //unitStepSize: 5,
                    minUnit: 'day',
                    displayFormats: {
                      'day': 'DD/MM'
                    }
                  },
                  tick: {
                    source: 'data'
                  }
                }],
                yAxes: [{
                  type: 'linear',
                  //distribution: 'series',
                  distribution: 'linear',
                  scaleLabels: {
                    display: true,
                    labelString: "Prix"
                  },
                  ticks: {
                    //stepSize: 1,
                    //maxTicksLimit: 8,
                    beginAtZero: true,
                    //source: 'data'
                  }
                }]
              }
            }
          }

          var ctx = document.getElementById("chart").getContext('2d');
          var myChart = new Chart(ctx, config);
        });
    })
  }
});

