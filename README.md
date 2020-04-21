# Tablet Dashboard

## Description

A dashboard application for my custom smart home system. It is a copy of Tablet Dashboard Legacy, refreshed and rebuilt in React. I focused on using custom hooks with Context API as a replacement for Redux.

## Quick overview

Demo: [https://gfycat.com/weakrewardingcaterpillar](https://gfycat.com/weakrewardingcaterpillar)

Displays current time, weather, forecast, air quality data, COVID-19 statistics. Connects to Google Calendar to show upcoming events. Displays camera feed. Shows data from smart home sensors (MQTT through WebSockets), and can open small and main gate; plays audio alert when gate opens. Features automatic night mode.

## Technologies used & features

TypeScript, React (with custom hooks & context), styled-components, Google API, axios, MQTT, date-fns, and many more.

## TODO

-   switch from "any" type to specific types everywhere (currently about 90% are specific types, 10% "any")
-   create a backend layer for caching API responses & MQTT feed
-   other minor code improvements

## Running

```
npm install
```

`npm run start` starts development server

`npm run build` creates production ready package
