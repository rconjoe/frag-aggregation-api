#!/bin/bash
function getip(){
    echo $(ifconfig | grep -E '(192\.168|10\.|172\.1[6789]\.|172\.2[0-9]\.|172\.3[01]\.)')
}
getip
exit
