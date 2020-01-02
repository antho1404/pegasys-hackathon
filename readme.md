# PEGASYS Hackathon

## _Monetize your API_

# Installation

## Install MESG Engine

Make sure that [MESG Engine](https://github.com/mesg-foundation/engine) is installed and running on your computer.
You can run the following command to install and start the Core:

```bash
 npm install -g @mesg/cli
```

## Download source

Download the source code of the application. You can clone this repository by using the following command:

```
git clone https://github.com/antho1404/pegasys-hackathon.git
```

## Create configuration file

Copy the `.env.example` to `.env`.

This file contains required configurations needed for the application.
You need to replace the `...` by the right value.

## Deploy MESG process

```bash
mesg-cli process:dev application.yml \
    --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT \
    --env PRIVATE_KEY=$PRIVATE_KEY \
    --env SENDGRID_API_KEY=$SENDGRID_API_KEY \
    --env CONTRACT_ABI=$CONTRACT_ABI
    --env CONTRACT_ADDRESS=$CONTRACT_ADDRESS \
```

## Start the website

```bash
docker build ui -t on-demand-payment
docker run -d -p 8080:80 on-demand-payment
```

You can access the website at the address `127.0.0.1:8080`.
