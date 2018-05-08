#!/bin/bash -e

ssh ec2-user@ec2-35-177-235-50.eu-west-2.compute.amazonaws.com -- cd build-your-own-radar && git pull && sudo restart techradar
