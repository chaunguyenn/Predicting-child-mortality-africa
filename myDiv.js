//graph 1: The child mortality trend is decreasing worldwide over the years 
//reference: https://plotly.com/javascript/line-charts/

//setting up the data array. I selected the World child mortality data from 1050-2017 for this graph
//to show the change in mortality rate over time

//data source: IHME 1950-2017 downloaded from Canvas

var trace = {
    x: [1950,1955,1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010,2017],	  
    y: [224.45, 203.49, 307.11, 172.13, 151.32, 134.17, 116.56, 101.82, 87.84, 80.88,73.48, 63.52, 53.48, 40.6],		
};

//setting up graph type: line graph
var data1 = [trace];

var layout = {
    title: {
        text: 'Number of Child Deaths Over The Years',
        font: {
            size: 18,
        },
    },
 xaxis: {
    title: {
        text: 'Source: Child Mortality 1950-2017, IHME (2017)', 
        font: {
            size: 15,
        }
    }, 
},
 yaxis: {
    title: {
        text: 'Death per 1000 live births',
        font: {
            size: 15,
        }
    }
  }
}

Plotly.newPlot('myDiv1', data1, layout); 

//graph 2: showing global child mortality rate in 2017 - focusing on problematic regions (Africa)
//reference: https://plotly.com/javascript/choropleth-maps/

//data source: IHME 1950-2017 downloaded from Canvas
//I chose a choropleth map visualization to help visualize more easily the mortarlity rate of different regions as of current years.
//The goal is to highlight Africa being the most impacted regions, leading the storyline to focus
//on Africa. I used a monochromatic color scheme (yellowish-deep red) that starts at a lighter color at a low value and 
//increases in intensity as the values increase. Red color invokes a sense of urgency, of needing attention.
//A color scale is provided to help with deciphering  the countries' given values. By using a 
//monochromatic color for my map, I can capture the audience's attention and hightlight the focus areas. 

//All maps allow users to hover over for more details. This gives them information and flexibility.

d3.csv('https://raw.githubusercontent.com/chaunguyenn/deco3100/main/deco3100a2.csv', function(err, rows){
    function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
    }
    
    //setting up graph type: choropleth 
    //allowing users to hover over a country and get specific mortality rate of that country 
    var data2 = [{
        type: 'choropleth', //indicate graph type 
        locationmode: 'country names', 
        locations: unpack(rows, 'Entity'), //take in location variable
        z: unpack(rows, 'Figures'), //take in data for color 
        zmax: 100,  
        zmid: 50,  
        zmin: 5,   
        text: unpack(rows, 'Figures'),
        colorscale: [[0, 'rgb(255,253,224)'], [1, 'rgb(194,3,0)']], //choose the color range
    }]

    var layout2 = {
        title: 'Global Child Mortality Rate 2017',
        width: 700,
        height: 500,
        geo: {
            projection: {
                type: 'robinson'
            }
        }
    }

    Plotly.newPlot("myDiv2", data2, layout2, {showLink: false});
});

//graph 3: showing breasfeeding statistics in Africa in 2017
//reference: https://plotly.com/javascript/choropleth-maps/

//data source: http://ghdx.healthdata.org/record/ihme-data/africa-exclusive-breastfeeding-prevalence-geospatial-estimates-2000-2017

//I chose a choropleth map because it provides the visuals that can complement my above argument of the relevancy
//of breastfeeding statistics. I used a triadic color scheme (deep red, yellow, green) to clarify 
//the different popularity of breasfeeding in African countries. Red color implies imminent danger, urgency - it is used for countries
//with breastfeeding rates lower than 10%. The orange-yellow imples calm, normal states - used to represent
//regions that have average breastfeeding statistics of 40%. Finally, green implies peaceful, positive vibes -
//which I for countries that have above 70% breastfeeding population. A color scale is provided to help 
//with deciphering values. 

d3.csv('https://raw.githubusercontent.com/chaunguyenn/deco3100/main/africa%20data.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    //graph type: choropleth
    var data3 = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: unpack(rows, 'Country name'),
        z: unpack(rows, 'Final figures'),
        text: unpack(rows, 'Country name'),
        colorscale: [[0, 'rgb(161, 0, 0)'], [0.5, 'rgb(255, 219, 133)'], [1, 'rgb(7, 173, 90)']],
        zmax: 70,  
        zmid: 40,  
        zmin: 10, 
    }]

   var layout3 = {
    title: 'Africa Breastfeeding Data by Population Percentage',
    width: 700, 
    height: 700,
       geo:{
           scope: 'africa',
       }
    };

    Plotly.newPlot("myDiv3", data3, layout3, {showLink: false});
});

//graph 4: comparing child motarlity rate vs breastfeeding rate of specific countries  

//graph type: line
//reference: https://plotly.com/javascript/line-charts/

//I wanted to show that high breastfeeding rates result in low mortalirty rates, so I selected
//countries with various breastfeeding rates and compare them to their corresponding mortality 
//rate. I used bar graphs to compare/constrast the child mortality rate versus breastfeeding statistics as per
//my above argument. The bar graph provides easiest visualizations for comparing multiple countries with 
//different values. I structure the data in a stair format, which the breastfeed values increasing and the child 
//mortality rate decreasing. The goal is to show that there is a correlation between breastfeeding and child mortalirty. 

var trace1 = {
    x: ['Chad', 'Gabon', 'Somalia', 'Niger', 'Egypt', 'Sao Tome and Principe', 'Rwanda'],
    y: [2.0721867, 5.7069522, 10.0674668, 13.3803908, 44.5547087, 64.7027907, 84.8216509],
    name: '% Population that Breastfeed',
    type: 'bar'
  };
  
  var trace2 = {
    x: ['Chad', 'Gabon', 'Somalia', 'Niger', 'Egypt', 'Sao Tome and Principe', 'Rwanda'],
    y: [112.75, 40.51, 110.4, 112, 20.39, 34.06, 50.68],
    name: 'Child Deaths per 1000 ',
    type: 'bar'
  };
  
  var data4 = [trace1, trace2];
  
  var layout4 = {
      barmode: 'group',
      width: 1000,
    };
  
  Plotly.newPlot('myDiv4', data4, layout4);

//graph 5: making prediction 

//graph type: line 
//reference: https://plotly.com/javascript/line-charts/
//data source: https://docs.google.com/spreadsheets/d/1j_hkJztpSYIi0ME5828YJPpyos43pCkJ6E-Ov19oD2I/edit?usp=sharing

//In making of the prediction, I filtered sub-Saharan regions in the provided data as most countries 
//discussed above belong to the Sub-Saharan regions. I chose 2 value intakes: years and mortality values
//to predict the future mortality. Using the Forecast formula on Google Sheets, I plugged in those values above and was able to 
//get prediction data for the future years. 
var trace_predict = {
    x: [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2017, 2020, 2025, 2030, 2035, 2040],	 
    y: [209.15, 194.8, 182.26, 171.24, 155.49, 132.42, 110.05, 84.07, 77.37940494, 55.5103871, 36.62062479, 17.73086248,0],
};

var data_prediction = [trace_predict];
var layout_prediction = {
    title: 'Predicting Future Child Mortality In Africa',
}

Plotly.newPlot('myDiv5', data_prediction, layout_prediction); 
