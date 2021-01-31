import React, {} from 'react';

import {
    Card  } from 'reactstrap';

    const NumberCard = (props)=>{
        return(
            <Card style={{height:"2.5em",padding:"0.5em",borderRadius:"0px"}} className="text-center">
                {props.c+1}
            </Card>
        )
    }

    export default NumberCard