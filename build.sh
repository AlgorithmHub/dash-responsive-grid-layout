#!/bin/bash

npm run build:js-dev
npm run build:py
pip3 uninstall dash-responsive-grid-layout
python setup.py sdist
pip3 install dist/dash_responsive_grid_layout-0.3.0.tar.gz 

