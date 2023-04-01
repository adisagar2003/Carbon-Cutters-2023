import React, { useEffect, useState } from 'react'
import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, PolygonF, Polyline, useLoadScript } from "@react-google-maps/api";
import { API_KEY_MAP } from './API_KEY';
import { Button, Center, Text, Toast, useToast } from '@chakra-ui/react';
import Confetti from 'react-confetti'



function Map() {
    const toast = useToast();
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [resultsArray,setResults] = useState<any>([]);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [origin, setOrigin] = useState<string>("176 Freshwater Rd.");
    const [destination, setDestination] = useState<string>("Avalon Mall");
    const ST_JOHNS_COORDS1 = [
        { lat: 47.565602159079184, lng: -52.70847376272357 },
        { lat: 47.57660464023815, lng: -52.72632654555248 },
        { lat: 47.56004213169494, lng: -52.73413713804013 },
        { lat: 47.56920666499619, lng: -52.71437753203732 }
    ]
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY_MAP // ,
        // ...otherOptions
    });
    const path = [
        { lat: 47.565602159079184, lng: -52.70847376272357 },
        { lat: 47.57660464023815, lng: -52.72632654555248 },
        { lat: 47.56004213169494, lng: -52.73413713804013 },
        { lat: 47.56920666499619, lng: -52.71437753203732 }
    ];
    const paths = [path, [{ lat: 47.565602159079184, lng: -52.70847376272357 },

    { lat: 47.57660464023815, lng: -52.72632654555248 },
    { lat: 47.56004213169494, lng: -52.73413713804013 },
], 
[{ lat: 47.58333447350268, lng: -52.70191958194524 }, { lat: 47.584348631044804, lng: -52.72253963727007 }, { lat: 47.57261243778823, lng: -52.693207929177746 }], [{ lat: 47.5706430091165, lng: -52.76049830354334 }, { lat: 47.56815948741018, lng: -52.7435937226934 }, { lat: 47.59862638293398, lng: -52.73311263335755 }, { lat: 47.565121999724916, lng: -52.770365043583794 }]]

    //
    const sfPolygonOptions = {

        strokeColor: `#FF${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`,
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        fillOpacity:0.1,
        editable: false,
        geodesic: false,
       
        zIndex: 1,
    }

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.4,
        
        strokeWeight: 0.1,
    
        fillOpacity: 0,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
        ],
        zIndex: 1
    };
    useEffect(() => {
        console.log({ isLoaded })
    }, []);


// Calculate route
async function calculateRoute() {
   try{
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results:any = await directionsService.route({
      origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
    //   origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
      destination:  { lat:47.5601708994926, lng:-52.756390529657466 },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    const results2:any = await directionsService.route({
        origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
      //   origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
        destination:  { lat:47.5012409621977, lng:-52.816808859447306 },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      const results3:any = await directionsService.route({
        origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
      //   origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
        destination:  { lat:47.5601708994926, lng:-52.756390529657466 },
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const results4:any = await directionsService.route({
        origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
      //   origin: { lat: 47.565602159079184, lng: -52.70847376272357 },
        destination:  { lat:47.50455437408004, lng:-52.85811491598395},
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
    
    setDirectionsResponse(results);
      setResults([ ...resultsArray, results]);
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

 
  catch(err){
    toast({
        title: `Error`,
        status:"error",
        isClosable: true,
      })
  }
}

  useEffect(()=>{
  console.log(directionsResponse)
    console.log(duration);
  console.log(distance);
  },[distance,duration ])

  

    return (

        <>
            {isLoaded &&

                <>
                <Center>
                  
                    <Button onClick={calculateRoute} position='absolute' type='shadow' top={10} fontSize={22}>Calculate</Button>
                </Center>
                <Center position="fixed" alignItems={'center'} left={'50%'}  transform={'translateX(-50%)'} bottom={0}>
                    <GoogleMap
                    
                        id="circle-example"
                        mapContainerStyle={{
                            height: "500px",
                            width: "100vw"
                        }}
                        zoom={12.3}
                        center={ { lat: 47.565602159079184, lng: -52.70847376272357 }}
                    >
                         <Marker position={{ lat: 47.565602159079184, lng: -52.70847376272357 }} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
            
          )}
                        <PolygonF path={ST_JOHNS_COORDS1} options={sfPolygonOptions} />
                        {paths.map((area)=>{return (<PolygonF path={area}  options={sfPolygonOptions}   />)})}
                    </GoogleMap>
                    </Center>
                </>}
        </>
    )
}

export default Map