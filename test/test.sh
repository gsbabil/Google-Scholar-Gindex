#!/bin/bash

echo "[+] testing with gindex.pl"
echo -e "\trob.html: $(perl gindex.pl rob.html | grep 'g-index' | awk '{print $NF}')"
echo -e "\tgdo.html: $(perl gindex.pl gdo.html | grep 'g-index' | awk '{print $NF}')"

echo "[+] testing with gindex.rb"
echo -e "\trob.html: $(ruby gindex.rb rob.html | grep 'g-index' | awk '{print $NF}')"
echo -e "\tgdo.html: $(ruby gindex.rb gdo.html | grep 'g-index' | awk '{print $NF}')"
