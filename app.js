document.addEventListener('DOMContentLoaded', function () {

  var API_KEY = '27efeb9368c8c4d45c578bb7d0136365';
  var BASE    = 'https://api.the-odds-api.com/v4';
  var ESPN    = 'https://site.api.espn.com/apis/site/v2/sports';

  // ── TIMEZONE PANAMÁ ───────────────────────────────────────────
  function formatGameTime(utcString) {
    if (!utcString) return '—';
    return new Date(utcString).toLocaleTimeString('es-PA', {
      hour: '2-digit', minute: '2-digit', timeZone: 'America/Panama'
    }) + ' (PTY)';
  }

  function isToday(utcString) {
    if (!utcString) return false;
    var pty = { timeZone: 'America/Panama' };
    return new Date(utcString).toLocaleDateString('es-PA', pty) === new Date().toLocaleDateString('es-PA', pty);
  }

  // ── MLB: ESTADIOS, COORDENADAS Y PARK FACTORS ─────────────────
  var TEAM_STADIUM = {
    "Arizona Diamondbacks":  { name: "Chase Field",              coords: [33.4453, -112.0667], pf: 1.04 },
    "Atlanta Braves":        { name: "Truist Park",              coords: [33.8907, -84.4677],  pf: 1.02 },
    "Baltimore Orioles":     { name: "Oriole Park",              coords: [39.2838, -76.6215],  pf: 1.07 },
    "Boston Red Sox":        { name: "Fenway Park",              coords: [42.3467, -71.0972],  pf: 1.10 },
    "Chicago Cubs":          { name: "Wrigley Field",            coords: [41.9484, -87.6553],  pf: 1.08 },
    "Chicago White Sox":     { name: "Guaranteed Rate Field",    coords: [41.8299, -87.6338],  pf: 1.05 },
    "Cincinnati Reds":       { name: "Great American Ball Park", coords: [39.0979, -84.5082],  pf: 1.11 },
    "Cleveland Guardians":   { name: "Progressive Field",        coords: [41.4962, -81.6852],  pf: 0.97 },
    "Colorado Rockies":      { name: "Coors Field",              coords: [39.7561, -104.9942], pf: 1.35 },
    "Detroit Tigers":        { name: "Comerica Park",            coords: [42.3390, -83.0485],  pf: 0.95 },
    "Houston Astros":        { name: "Minute Maid Park",         coords: [29.7572, -95.3555],  pf: 1.03 },
    "Kansas City Royals":    { name: "Kauffman Stadium",         coords: [39.0517, -94.4803],  pf: 0.97 },
    "Los Angeles Angels":    { name: "Angel Stadium",            coords: [33.8003, -117.8827], pf: 1.01 },
    "Los Angeles Dodgers":   { name: "Dodger Stadium",           coords: [34.0736, -118.2402], pf: 1.02 },
    "Miami Marlins":         { name: "loanDepot park",           coords: [25.7781, -80.2197],  pf: 0.87 },
    "Milwaukee Brewers":     { name: "American Family Field",    coords: [43.0280, -87.9712],  pf: 1.02 },
    "Minnesota Twins":       { name: "Target Field",             coords: [44.9817, -93.2781],  pf: 0.99 },
    "New York Mets":         { name: "Citi Field",               coords: [40.7571, -73.8458],  pf: 0.96 },
    "New York Yankees":      { name: "Yankee Stadium",           coords: [40.8296, -73.9262],  pf: 1.05 },
    "Oakland Athletics":     { name: "Oakland Coliseum",         coords: [37.7516, -122.2005], pf: 0.92 },
    "Philadelphia Phillies": { name: "Citizens Bank Park",       coords: [39.9061, -75.1665],  pf: 1.08 },
    "Pittsburgh Pirates":    { name: "PNC Park",                 coords: [40.4469, -80.0057],  pf: 0.99 },
    "San Diego Padres":      { name: "Petco Park",               coords: [32.7077, -117.1569], pf: 0.84 },
    "San Francisco Giants":  { name: "Oracle Park",              coords: [37.7786, -122.3893], pf: 0.90 },
    "Seattle Mariners":      { name: "T-Mobile Park",            coords: [47.5914, -122.3325], pf: 0.93 },
    "St. Louis Cardinals":   { name: "Busch Stadium",            coords: [38.6226, -90.1928],  pf: 0.99 },
    "Tampa Bay Rays":        { name: "Tropicana Field",          coords: [27.7683, -82.6534],  pf: 0.94 },
    "Texas Rangers":         { name: "Globe Life Field",         coords: [32.7512, -97.0832],  pf: 1.07 },
    "Toronto Blue Jays":     { name: "Rogers Centre",            coords: [43.6414, -79.3894],  pf: 1.03 },
    "Washington Nationals":  { name: "Nationals Park",           coords: [38.8730, -77.0074],  pf: 1.00 }
  };

  function getWindDescription(deg) {
    var dirs = ['Norte','Noreste','Este','Sureste','Sur','Suroeste','Oeste','Noroeste'];
    return dirs[Math.round(deg / 45) % 8];
  }

  // ── OPEN-METEO (SIN KEY, GRATIS) ──────────────────────────────
  var windCache = {};
  async function fetchWindData(lat, lon) {
    var key = lat + ',' + lon;
    if (windCache[key]) return windCache[key];
    try {
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
                '&longitude=' + lon +
                '&current=wind_speed_10m,wind_direction_10m,temperature_2m' +
                '&wind_speed_unit=kmh&timezone=America%2FPanama';
      var res  = await fetch(url);
      var data = await res.json();
      var cur  = data.current || {};
      var result = {
        speed:     Math.round(cur.wind_speed_10m     || 0),
        direction: Math.round(cur.wind_direction_10m || 0),
        temp:      Math.round(cur.temperature_2m     || 0)
      };
      windCache[key] = result;
      return result;
    } catch (e) { return null; }
  }

  // ── ESPN PITCHERS MLB ─────────────────────────────────────────
  var pitchersCache = null;

  async function fetchMLBPitchers() {
    if (pitchersCache) return pitchersCache;
    try {
      var res  = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
      var data = await res.json();
      var result = {};

      (data.events || []).forEach(function (ev) {
        var comp = ev.competitions && ev.competitions[0];
        if (!comp) return;

        var homeTeam = '', awayTeam = '';
        (comp.competitors || []).forEach(function (c) {
          if (c.homeAway === 'home') homeTeam = (c.team && c.team.displayName) || '';
          if (c.homeAway === 'away') awayTeam = (c.team && c.team.displayName) || '';
        });

        // ESPN usa "probables" o dentro de cada competitor "probable"
        var pitchers = { home: null, away: null };

        // Método 1: comp.probables
        if (comp.probables && comp.probables.length > 0) {
          comp.probables.forEach(function (p) {
            var athlete = p.athlete || {};
            var stats   = p.statistics || [];
            var era     = stats.find(function (s) { return s.name === 'ERA'; });
            var whip    = stats.find(function (s) { return s.name === 'WHIP'; });
            pitchers[p.homeAway] = {
              name: athlete.displayName || athlete.shortName || 'TBD',
              era:  era  ? parseFloat(era.displayValue).toFixed(2)  : '—',
              whip: whip ? parseFloat(whip.displayValue).toFixed(2) : '—'
            };
          });
        }

        // Método 2: dentro de cada competitor
        if (!pitchers.home && !pitchers.away) {
          (comp.competitors || []).forEach(function (c) {
            if (c.probable) {
              var athlete = c.probable.athlete || {};
              var stats   = c.probable.statistics || [];
              var era     = stats.find(function (s) { return s.name === 'ERA'; });
              pitchers[c.homeAway] = {
                name: athlete.displayName || 'TBD',
                era:  era ? parseFloat(era.displayValue).toFixed(2) : '—',
                whip: '—'
              };
            }
          });
        }

        var key = homeTeam.toLowerCase() + '|' + awayTeam.toLowerCase();
        result[key] = { homeTeam: homeTeam, awayTeam: awayTeam, pitchers: pitchers };
      });

      pitchersCache = result;
      return result;
    } catch (e) { return {}; }
  }

  function findPitchers(allPitchers, homeTeam, awayTeam) {
    var directKey = homeTeam.toLowerCase() + '|' + awayTeam.toLowerCase();
    if (allPitchers[directKey]) return allPitchers[directKey].pitchers;

    // Búsqueda flexible por última palabra del nombre
    var hLast = homeTeam.toLowerCase().split(' ').pop();
    var aLast = awayTeam.toLowerCase().split(' ').pop();
    var keys  = Object.keys(allPitchers);
    var match = keys.find(function (k) {
      return k.includes(hLast) || k.includes(aLast);
    });
    return match ? allPitchers[match].pitchers : { home: null, away: null };
  }

  // ── ESPN LEAGUE MAP ───────────────────────────────────────────
  var ESPN_LEAGUE_MAP = {
    soccer_epl:                        { sport: 'soccer',     league: 'eng.1' },
    soccer_spain_la_liga:              { sport: 'soccer',     league: 'esp.1' },
    soccer_spain_segunda_division:     { sport: 'soccer',     league: 'esp.2' },
    soccer_germany_bundesliga:         { sport: 'soccer',     league: 'ger.1' },
    soccer_germany_bundesliga2:        { sport: 'soccer',     league: 'ger.2' },
    soccer_italy_serie_a:              { sport: 'soccer',     league: 'ita.1' },
    soccer_italy_serie_b:              { sport: 'soccer',     league: 'ita.2' },
    soccer_france_ligue_one:           { sport: 'soccer',     league: 'fra.1' },
    soccer_france_ligue_two:           { sport: 'soccer',     league: 'fra.2' },
    soccer_portugal_primeira_liga:     { sport: 'soccer',     league: 'por.1' },
    soccer_netherlands_eredivisie:     { sport: 'soccer',     league: 'ned.1' },
    soccer_belgium_first_div:          { sport: 'soccer',     league: 'bel.1' },
    soccer_turkey_s
