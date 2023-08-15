var data_samples ;
var metadata ;

//const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const url = "static/samples.json";
function addMetaDatas(metaDatas){
      let divTag = d3.select("#sample-metadata");

//   for (var i = 0; i < metaDatas.length; i++) {
//     var metaData = metaDatas[i];
//     var hTag = divTag.append("h5");
//     hTag.text(metaData);
//  }
divTag.html("");
for (var key in metaDatas) {
  var value =  metaDatas[key];
  var hTag = divTag.append("h5");
  hTag.text(key+":"+value);
}

}

d3.json(url).then(function(data) {
  console.log(data);
  let names = data.names;
  console.log(names);

  metadata = data.metadata;

  let selectTag = d3.select("#selDataset");

   for (var i = 0; i < names.length; i++) {
     var name = names[i];
     var option = selectTag.append("option");
     option.text(name);
  }


   var sampleId =  selectTag.property("value");
   console.log(sampleId);

    data_samples = data.samples;

function selectBySampleId(sample) {
  return sample.id == sampleId;
}

my_metadata = metadata.filter(selectBySampleId)[0]

var data = data_samples.filter(selectBySampleId)[0];

  var otu_ids = data.otu_ids;
  var otu_labels = data.otu_labels;
  var sample_values = data.sample_values;


  var samples = [];

    for (var i = 0; i < otu_ids.length; i++) {
     var  otu_id = otu_ids[i];
     var  otu_label = otu_labels[i];
     var  sample_value = sample_values[i];
     var sample = {
       otu_id:otu_id,
       otu_label:otu_label,
       sample_value:sample_value
     };
     samples.push(sample)
  }


// Sort the data by Greek search results descending
let sortedData = samples.sort((a, b) => b.sample_values - a.sample_values);

// Slice the first 10 objects for plotting
slicedData = sortedData.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
let trace1 = {
  x: reversedData.map(object => object.sample_value),
  y: reversedData.map(object => "OTU " +object.otu_id),
  text: reversedData.map(object => object.otu_label),
  name: "otu_dsata",
  type: "bar",
  orientation: "h"
};

console.log(trace1);
// Data array
// `data` has already been defined, so we must choose a new name here:
let traceData = [trace1];

// Apply a title to the layout
let layout = {
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
// Note that we use `traceData` here, not `data`
Plotly.newPlot("bar", traceData, layout);



 trace1 = {
  x: samples.map(object => object.otu_id),
  y: samples.map(object => object.sample_value),
  text: reversedData.map(object => object.otu_label),
  mode: 'markers',
  marker: {
    size: samples.map(object => object.sample_value),
    color:samples.map(object => object.otu_id)
  }
};

var data = [trace1];

 layout = {
  showlegend: false,
  height: 600,
  width: 600
};

Plotly.newPlot('bubble', data, layout);


// my_metadata

addMetaDatas(my_metadata);

//function selectYounger(person) {
//  return person.age < 30;
//}
//
//// filter() uses the custom function as its argument
//let youngSimpsons = simpsons.filter(selectYounger);

//  let sortedByGreekSearch = data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);


//let li1 = d3.select("ul").append("li");
//li1.text("A new item has been added!");


//  let option = selectTag.append("option");
//  option.text("100");
//
//  option = selectTag.append("option");
//  option.text("200");

});

// drop button changeed event
function optionChanged(sampleId){

console.log(sampleId);

//
function selectBySampleId(sample) {
  return sample.id == sampleId;
}

var data = data_samples.filter(selectBySampleId)[0];

  var otu_ids = data.otu_ids;
  var otu_labels = data.otu_labels;
  var sample_values = data.sample_values;

  var samples = [];

    for (var i = 0; i < otu_ids.length; i++) {
     var  otu_id = otu_ids[i];
     var  otu_label = otu_labels[i];
     var  sample_value = sample_values[i];
     var sample = {
       otu_id:otu_id,
       otu_label:otu_label,
       sample_value:sample_value
     };
     samples.push(sample)
  }
// bar
let sortedData = samples.sort((a, b) => b.sample_values - a.sample_values);
slicedData = sortedData.slice(0, 10);
reversedData = slicedData.reverse();

  x = reversedData.map(object => object.sample_value);
  y =  reversedData.map(object => "OTU " +object.otu_id);
  text = reversedData.map(object => object.otu_label);

  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);
  Plotly.restyle("bar", "text", [text]);

// bubble
  x = samples.map(object => object.otu_id),
  y = samples.map(object => object.sample_value),
  text = reversedData.map(object => object.otu_label),
    size = samples.map(object => object.sample_value),
    color = samples.map(object => object.otu_id)

 layout = {
  showlegend: false,
  height: 600,
  width: 600
};

//Plotly.newPlot('bubble', data, layout);

Plotly.restyle("bubble", "text", [text]);

  Plotly.restyle("bubble", "x", [x]);
  Plotly.restyle("bubble", "y", [y]);
  Plotly.restyle("bubble", "size", [size]);
  Plotly.restyle("bubble", "color", [color]);



// metadata

my_metadata = metadata.filter(selectBySampleId)[0]
addMetaDatas(my_metadata);

};