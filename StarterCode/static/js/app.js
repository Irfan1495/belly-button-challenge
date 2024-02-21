function getPlots(id) {

    //Calling on d3 to read the json file for us.

        d3.json("samples.json").then (jsonfile =>{
            console.log(jsonfile)
            var ids = jsonfile.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  jsonfile.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  jsonfile.samples[0].otu_labels.slice(0,10);
            console.log (labels)

        // Getting top 10 otu ids

            var OTU_top = ( jsonfile.samples[0].otu_ids.slice(0, 10)).reverse();

        // Getting plots from otu

            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)

         // Getting top 10 plots

            var labels =  jsonfile.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };

            // create variable

            var data = [trace];
    

            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // BAR plot

        Plotly.newPlot("bar", data, layout);

            // Bubble Chart

            var trace1 = {
                x: jsonfile.samples[0].otu_ids,
                y: jsonfile.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: jsonfile.samples[0].sample_values,
                    color: jsonfile.samples[0].otu_ids
                },
                text:  jsonfile.samples[0].otu_labels
    
            };
    
            // Bubble chart layout

            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // Data Variable

            var data1 = [trace1];
    
        // Creating bubble plot

        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    

    function getDemoInfo(id) {

   // Json file to read

        d3.json("samples.json").then((data)=> {

    
            var metadata = data.metadata;
    
            console.log(metadata)
    
         
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          
           var demographicInfo = d3.select("#sample-metadata");
            
         
           demographicInfo.html("");
    
        
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Function for initial data

    function init() {

        // Drop down menu
        var dropdown = d3.select("#selDataset");
    
        // Reading Data
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
           
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();