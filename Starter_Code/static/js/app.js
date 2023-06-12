// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// fetch the Json data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// This function is called when a dropdwn menu item is selected.
function init() {
    
    let dropdownMenu = d3.select("#selDataset");
    
    d3.json(url).then((data) => {
        // console.log(data);

        let names = data.names;
        
        names.forEach(function (id) {
            console.log(id);

            dropdownMenu.append("option").text(id).property("value", id)
        });
        
        let first_sample = names[0];

        console.log(first_sample);
        // console.log(selectedID);

        Horizontalbar(first_sample);
        bubbleChart(first_sample);
        metadata(first_sample);
        gaugeChart(first_sample);

    });

};

// Function that populates metadata info
function metadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);
  
        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        let panel = d3.select("#sample-metadata");
        panel.html("")

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key, value]) => {panel.append("h5").text(`${key}: ${value}`)});
    });

};
            
function Horizontalbar(sample) {
    
     // let barArea = d3.select("#bar");
    
    d3.json(url).then(function(data) {
    
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

    
        let trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
    
        let layout = {
            title: "Top 10 OTUs"
        };
    
            
    
            Plotly.newPlot("bar", [trace1], layout);
    
        });
    
    }
    
    function bubbleChart(sample) {
    
        d3.json(url).then(function(data) {
    
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace2], layout)
    });
};

    function gaugeChart(sample) {

        d3.json(url).then(function(data) {
            let washInfo = data.metadata;

            // Filter based on the value of the sample
            let filtervalue = washInfo.filter(result => result.id == sample);
    
            // Get the first index from the array 
            let valueData = filtervalue[0];
    
            // Get the freq value
            let frequentvalue = valueData.frequentvalue;
    
            // Log the data to the console
            console.log(frequentvalue);
            
            // Set trace for gauge chart
            let trace3 = {
                value: frequentvalue,
                type: "indicator",
                mode: "gauge",
                visible: true, 
                
                title: {text: "<b> Washing Frequency of Bely Buttons </b> <br></br> Scrubs Per Week"},
                gauge: {
                  axis: {range: [null,9], dtick: "1"},
                 
                  steps:[
                    {range: [0,1], color: "#D9E8CC"},
                    {range: [1,2], color: "#B7D8AA"},
                    {range: [2,3], color: "#8EC788"},
                    {range: [3,4], color: "#67B66E"},
                    {range: [4,5], color: "#47A461"},
                    {range: [5,6], color: "#279258"},
                    {range: [6,7], color: "#087F55"},
                    {range: [7,8], color: "#057162"},
                    {range: [8,9], color: "#035C62"},
                  ],

                  arrow: {
                    color: 'red',
                    thickness: 0.5,
                    visible: true
                  },
                

                  
                }
            };
            
    
            // Set layout
            let layout = {
                width: 600, height: 500, margin: { t: 1, b: 1 } 
              };
    
            // Plot the bubble chart using Plotly
            Plotly.newPlot("gauge", [trace3], layout)
        });
    };

  
    
    function optionChanged() {
    
        let selectButton = d3.select("#selDataset");
        let value = selectButton.property("value");
        // console.log(value);
    
        Horizontalbar(value);
        bubbleChart(value);
        metadata(value);
        gaugeChart(value);
    
    };
    
    init();