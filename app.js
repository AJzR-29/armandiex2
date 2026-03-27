document.addEventListener('DOMContentLoaded', function () {

  var API_KEY = '27efeb9368c8c4d45c578bb7d0136365';
  var BASE    = 'https://api.the-odds-api.com/v4';
  var ESPN    = 'https://site.api.espn.com/apis/site/v2/sports';
  var ESPN3   = 'https://site.api.espn.com/apis/common/v3/sports';

  var BASEBALL_PANEL_LEAGUES = ['baseball_mlb', 'baseball_mlb_preseason', 'baseball_ncaa'];

  // ── ESTADIOS MLB ──────────────────────────────────────────────
  var TEAM_STADIUM = {
    "Arizona Diamondbacks":  { name:"Chase Field",              coords:[33.4453,-112.0667], pf:1.04 },
    "Atlanta Braves":        { name:"Truist Park",              coords:[33.8907,-84.4677],  pf:1.02 },
    "Baltimore Orioles":     { name:"Oriole Park",              coords:[39.2838,-76.6215],  pf:1.07 },
    "Boston Red Sox":        { name:"Fenway Park",              coords:[42.3467,-71.0972],  pf:1.10 },
    "Chicago Cubs":          { name:"Wrigley Field",            coords:[41.9484,-87.6553],  pf:1.08 },
    "Chicago White Sox":     { name:"Guaranteed Rate Field",    coords:[41.8299,-87.6338],  pf:1.05 },
    "Cincinnati Reds":       { name:"Great American Ball Park", coords:[39.0979,-84.5082],  pf:1.11 },
    "Cleveland Guardians":   { name:"Progressive Field",        coords:[41.4962,-81.6852],  pf:0.97 },
    "Colorado Rockies":      { name:"Coors Field",              coords:[39.7561,-104.9942], pf:1.35 },
    "Detroit Tigers":        { name:"Comerica Park",            coords:[42.3390,-83.0485],  pf:0.95 },
    "Houston Astros":        { name:"Minute Maid Park",         coords:[29.7572,-95.3555],  pf:1.03 },
    "Kansas City Royals":    { name:"Kauffman Stadium",         coords:[39.0517,-94.4803],  pf:0.97 },
    "Los Angeles Angels":    { name:"Angel Stadium",            coords:[33.8003,-117.8827], pf:1.01 },
    "Los Angeles Dodgers":   { name:"Dodger Stadium",           coords:[34.0736,-118.2402], pf:1.02 },
    "Miami Marlins":         { name:"loanDepot park",           coords:[25.7781,-80.2197],  pf:0.87 },
    "Milwaukee Brewers":     { name:"American Family Field",    coords:[43.0280,-87.9712],  pf:1.02 },
    "Minnesota Twins":       { name:"Target Field",             coords:[44.9817,-93.2781],  pf:0.99 },
    "New York Mets":         { name:"Citi Field",               coords:[40.7571,-73.8458],  pf:0.96 },
    "New York Yankees":      { name:"Yankee Stadium",           coords:[40.8296,-73.9262],  pf:1.05 },
    "Oakland Athletics":     { name:"Oakland Coliseum",         coords:[37.7516,-122.2005], pf:0.92 },
    "Philadelphia Phillies": { name:"Citizens Bank Park",       coords:[39.9061,-75.1665],  pf:1.08 },
    "Pittsburgh Pirates":    { name:"PNC Park",                 coords:[40.4469,-80.0057],  pf:0.99 },
    "San Diego Padres":      { name:"Petco Park",               coords:[32.7077,-117.1569], pf:0.84 },
    "San Francisco Giants":  { name:"Oracle Park",              coords:[37.7786,-122.3893], pf:0.90 },
    "Seattle Mariners":      { name:"T-Mobile Park",            coords:[47.5914,-122.3325], pf:0.93 },
    "St. Louis Cardinals":   { name:"Busch Stadium",            coords:[38.6226,-90.1928],  pf:0.99 },
    "Tampa Bay Rays":        { name:"Tropicana Field",          coords:[27.7683,-82.6534],  pf:0.94 },
    "Texas Rangers":         { name:"Globe Life Field",         coords:[32.7512,-97.0832],  pf:1.07 },
    "Toronto Blue Jays":     { name:"Rogers Centre",            coords:[43.6414,-79.3894],  pf:1.03 },
    "Washington Nationals":  { name:"Nationals Park",           coords:[38.8730,-77.0074],  pf:1.00 }
  };

  // ── LIGAS ─────────────────────────────────────────────────────
  var NBA_TEAMS = [
    'Atlanta Hawks','Boston Celtics','Brooklyn Nets','Charlotte Hornets',
    'Chicago Bulls','Cleveland Cavaliers','Dallas Mavericks','Denver Nuggets',
    'Detroit Pistons','Golden State Warriors','Houston Rockets','Indiana Pacers',
    'Los Angeles Clippers','Los Angeles Lakers','Memphis Grizzlies','Miami Heat',
    'Milwaukee Bucks','Minnesota Timberwolves','New Orleans Pelicans','New York Knicks',
    'Oklahoma City Thunder','Orlando Magic','Philadelphia 76ers','Phoenix Suns',
    'Portland Trail Blazers','Sacramento Kings','San Antonio Spurs','Toronto Raptors',
    'Utah Jazz','Washington Wizards'
  ];
  var MLB_TEAMS = [
    'Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox',
    'Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Guardians',
    'Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals',
    'Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers',
    'Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics',
    'Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants',
    'Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers',
    'Toronto Blue Jays','Washington Nationals'
  ];

  var LEAGUES = {
    soccer: [
      { key:'soccer_uefa_champs_league',               title:'🏆 UEFA Champions League' },
      { key:'soccer_uefa_champs_league_qualification', title:'🏆 UCL Clasificación' },
      { key:'soccer_uefa_europa_league',               title:'🏆 UEFA Europa League' },
      { key:'soccer_uefa_europa_conference_league',    title:'🏆 UEFA Conference League' },
      { key:'soccer_uefa_nations_league',              title:'🏆 UEFA Nations League' },
      { key:'soccer_epl',                              title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
      { key:'soccer_efl_champ',                        title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Championship' },
      { key:'soccer_fa_cup',                           title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 FA Cup' },
      { key:'soccer_spain_la_liga',                    title:'🇪🇸 La Liga' },
      { key:'soccer_spain_segunda_division',           title:'🇪🇸 La Liga 2' },
      { key:'soccer_spain_copa_del_rey',               title:'🇪🇸 Copa del Rey' },
      { key:'soccer_germany_bundesliga',               title:'🇩🇪 Bundesliga' },
      { key:'soccer_germany_bundesliga2',              title:'🇩🇪 Bundesliga 2' },
      { key:'soccer_germany_dfb_pokal',                title:'🇩🇪 DFB-Pokal' },
      { key:'soccer_italy_serie_a',                    title:'🇮🇹 Serie A' },
      { key:'soccer_italy_serie_b',                    title:'🇮🇹 Serie B' },
      { key:'soccer_italy_coppa_italia',               title:'🇮🇹 Coppa Italia' },
      { key:'soccer_france_ligue_one',                 title:'🇫🇷 Ligue 1' },
      { key:'soccer_france_ligue_two',                 title:'🇫🇷 Ligue 2' },
      { key:'soccer_portugal_primeira_liga',           title:'🇵🇹 Primeira Liga' },
      { key:'soccer_netherlands_eredivisie',           title:'🇳🇱 Eredivisie' },
      { key:'soccer_belgium_first_div',                title:'🇧🇪 First Division A' },
      { key:'soccer_spl',                              title:'🏴󠁧󠁢󠁳󠁣󠁴󠁿 Premiership' },
      { key:'soccer_turkey_super_league',              title:'🇹🇷 Süper Lig' },
      { key:'soccer_conmebol_copa_libertadores',       title:'🌎 Copa Libertadores' },
      { key:'soccer_conmebol_copa_sudamericana',       title:'🌎 Copa Sudamericana' },
      { key:'soccer_argentina_primera_division',       title:'🇦🇷 Primera División' },
      { key:'soccer_brazil_campeonato',                title:'🇧🇷 Brasileirão Série A' },
      { key:'soccer_chile_campeonato',                 title:'🇨🇱 Primera División Chile' },
      { key:'soccer_mexico_ligamx',                    title:'🇲🇽 Liga MX' },
      { key:'soccer_usa_mls',                          title:'🇺🇸 MLS' },
      { key:'soccer_saudi_arabia_pro_league',          title:'🇸🇦 Saudi Pro League' },
      { key:'soccer_japan_j_league',                   title:'🇯🇵 J League' },
      { key:'soccer_australia_aleague',                title:'🇦🇺 A-League' },
      { key:'soccer_uefa_champs_league',               title:'🌍 UEFA Champions League' },
      { key:'soccer_fifa_club_world_cup',              title:'🌍 FIFA Club World Cup' }
    ],
    basketball: [
      { key:'basketball_nba',          title:'🇺🇸 NBA',           staticTeams: NBA_TEAMS },
      { key:'basketball_nba_preseason',title:'🇺🇸 NBA Preseason', staticTeams: NBA_TEAMS },
      { key:'basketball_wnba',         title:'🇺🇸 WNBA' },
      { key:'basketball_ncaab',        title:'🇺🇸 NCAA Basketball' },
      { key:'basketball_euroleague',   title:'🇪🇺 EuroLeague' },
      { key:'basketball_nbl',          title:'🇦🇺 NBL Australia' }
    ],
    baseball: [
      { key:'baseball_mlb',            title:'⚾ MLB',           staticTeams: MLB_TEAMS, panel: true },
      { key:'baseball_mlb_preseason',  title:'⚾ MLB Preseason', staticTeams: MLB_TEAMS, panel: true },
      { key:'baseball_ncaa',           title:'🎓 NCAA Béisbol',                          panel: true },
      { key:'baseball_npb',            title:'🇯🇵 NPB Japón' },
      { key:'baseball_kbo',            title:'🇰🇷 KBO Corea' }
    ]
  };

  var ESPN_LEAGUE_MAP = {
    soccer_epl:                        { sport:'soccer',     league:'eng.1' },
    soccer_spain_la_liga:              { sport:'soccer',     league:'esp.1' },
    soccer_spain_segunda_division:     { sport:'soccer',     league:'esp.2' },
    soccer_germany_bundesliga:         { sport:'soccer',     league:'ger.1' },
    soccer_germany_bundesliga2:        { sport:'soccer',     league:'ger.2' },
    soccer_italy_serie_a:              { sport:'soccer',     league:'ita.1' },
    soccer_france_ligue_one:           { sport:'soccer',     league:'fra.1' },
    soccer_portugal_primeira_liga:     { sport:'soccer',     league:'por.1' },
    soccer_netherlands_eredivisie:     { sport:'soccer',     league:'ned.1' },
    soccer_belgium_first_div:          { sport:'soccer',     league:'bel.1' },
    soccer_turkey_super_league:        { sport:'soccer',     league:'tur.1' },
    soccer_spl:                        { sport:'soccer',     league:'sco.1' },
    soccer_usa_mls:                    { sport:'soccer',     league:'usa.1' },
    soccer_mexico_ligamx:              { sport:'soccer',     league:'mex.1' },
    soccer_brazil_campeonato:          { sport:'soccer',     league:'bra.1' },
    soccer_argentina_primera_division: { sport:'soccer',     league:'arg.1' },
    soccer_chile_campeonato:           { sport:'soccer',     league:'chi.1' },
    soccer_uefa_champs_league:         { sport:'soccer',     league:'UEFA.Champions_League' },
    soccer_uefa_europa_league:         { sport:'soccer',     league:'UEFA.Europa_League' },
    soccer_conmebol_copa_libertadores: { sport:'soccer',     league:'conmebol.libertadores' },
    basketball_nba:                    { sport:'basketball', league:'nba' },
    basketball_nba_preseason:          { sport:'basketball', league:'nba' },
    basketball_wnba:                   { sport:'basketball', league:'wnba' },
    basketball_ncaab:                  { sport:'basketball', league:'mens-college-basketball' },
    baseball_mlb:                      { sport:'baseball',   league:'mlb' },
    baseball_mlb_preseason:            { sport:'baseball',   league:'mlb' },
    baseball_ncaa:                     { sport:'baseball',   league:'college-baseball' }
  };

  // ── ESTADO ────────────────────────────────────────────────────
  var eventsCache   = [];
  var espnTeamsMap  = {};
  var espnDataCache = {};
  var scanResults   = [];
  var evMinActive   = 0;
  var windCache     = {};
  var pitchersCache = null;
  var mlbStatsCache = null;

  // ── DOM ───────────────────────────────────────────────────────
  var sportSelect  = document.getElementById('sportSelect');
  var leagueSelect = document.getElementById('leagueSelect');
  var teamA        = document.getElementById('teamA');
  var teamB        = document.getElementById('teamB');
  var predictBtn   = document.getElementById('predictBtn');
  var loader       = document.getElementById('loader');
  var errorDiv     = document.getElementById('error');
  var errorMsg     = document.getElementById('errorMsg');
  var resultDiv    = document.getElementById('result');
  var combinedDiv  = document.getElementById('combinedScore');
  var espnPanel    = document.getElementById('espnPanel');
  var espnGrid     = document.getElementById('espnGrid');
  var quotaInfo    = document.getElementById('quotaInfo');
  var scanBtn      = document.getElementById('scanBtn');
  var scannerPanel = document.getElementById('scannerPanel');
  var evFilterRow  = document.getElementById('evFilterRow');
  var v1Panel      = document.getElementById('v1Panel');
  var mlbPanel     = document.getElementById('mlbGamesPanel');

  // ── HELPERS ───────────────────────────────────────────────────
  function showError(msg) { errorMsg.textContent = msg; errorDiv.style.display = 'block'; }
  function hideError()    { errorDiv.style.display = 'none'; }
  function setLoading(on) { loader.style.display = on ? 'block' : 'none'; }
  function oddsToProb(d)  { return 1 / d; }

  function formatGameTime(utcString) {
    if (!utcString) return '—';
    return new Date(utcString).toLocaleTimeString('es-PA', {
      hour:'2-digit', minute:'2-digit', timeZone:'America/Panama'
    }) + ' (PTY)';
  }

  function isToday(utcString) {
    if (!utcString) return false;
    var pty = { timeZone:'America/Panama' };
    return new Date(utcString).toLocaleDateString('es-PA', pty) ===
           new Date().toLocaleDateString('es-PA', pty);
  }

  function getWindDescription(deg) {
    var dirs = ['Norte','Noreste','Este','Sureste','Sur','Suroeste','Oeste','Noroeste'];
    return dirs[Math.round(deg / 45) % 8];
  }

  function getAvgProb(events, name) {
    var total = 0, count = 0;
    events.forEach(function (ev) {
      if (ev.home_team !== name && ev.away_team !== name) return;
      ev.bookmakers.forEach(function (bk) {
        var h2h = bk.markets.find(function (m) { return m.key === 'h2h'; });
        if (!h2h) return;
        var out = h2h.outcomes.find(function (o) { return o.name === name; });
        if (out) { total += oddsToProb(out.price); count++; }
      });
    });
    return count > 0 ? total / count : null;
  }

  function getBestOdd(ev, teamName) {
    var best = 1;
    var nameLower = teamName.toLowerCase();
    var nameLast  = nameLower.split(' ').pop();
    ev.bookmakers.forEach(function (bk) {
      var h2h = bk.markets.find(function (m) { return m.key === 'h2h'; });
      if (!h2h) return;
      h2h.outcomes.forEach(function (o) {
        if (!o.price || o.price <= 1 || o.price > 15) return;
        var oLower = o.name.toLowerCase();
        var match  = oLower === nameLower || oLower.includes(nameLast) || nameLower.includes(oLower.split(' ').pop());
        if (match && o.price > best) best = o.price;
      });
    });
    return best;
  }

  function calcFormScore(form) {
    if (!form || form.length === 0) return null;
    var weights = [1.0, 0.9, 0.8, 0.7, 0.6];
    var total = 0, maxTotal = 0;
    form.slice().reverse().forEach(function (f, i) {
      var w = weights[i] || 0.5; maxTotal += w;
      if (f.result === 'W') total += w;
      else if (f.result === 'D') total += w * 0.5;
    });
    return maxTotal > 0 ? total / maxTotal : null;
  }

  // ── OPEN-METEO ────────────────────────────────────────────────
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
      var r    = { speed: Math.round(cur.wind_speed_10m||0), direction: Math.round(cur.wind_direction_10m||0), temp: Math.round(cur.temperature_2m||0) };
      windCache[key] = r;
      return r;
    } catch(e) { return null; }
  }

  // ── ESPN MLB STATS (K/G + H/G) ────────────────────────────────
  async function fetchMLBPlayerStats(espnLeague) {
    if (mlbStatsCache) return mlbStatsCache;
    var league = espnLeague || 'mlb';
    var base   = ESPN3 + '/baseball/' + league + '/statistics/byathlete';
    try {
      var res = await Promise.all([
        fetch(base + '?category=batting&sort=batting.hits&limit=100&lang=en&region=us'),
        fetch(base + '?category=pitching&sort=pitching.strikeouts&limit=100&lang=en&region=us')
      ]);
      var batJ   = res[0].ok ? await res[0].json() : null;
      var pitchJ = res[1].ok ? await res[1].json() : null;

      function parseAthletes(json, statKey, gamesKey) {
        if (!json || !json.athletes) return [];
        return json.athletes.map(function (a) {
          var vals = {};
          (a.categories || []).forEach(function (cat) {
            (cat.names || []).forEach(function (n, i) {
              vals[n] = parseFloat((cat.values || [])[i]) || 0;
            });
          });
          var main   = vals[statKey]   || 0;
          var games  = vals[gamesKey]  || 1;
          var ath    = a.athlete || {};
          return {
            name:   ath.displayName || '—',
            team:   (ath.team && ath.team.abbreviation) || '—',
            main:   main,
            games:  Math.max(games, 1),
            era:    vals['ERA']  || 0,
            whip:   vals['WHIP'] || 0,
            avg:    vals['avg']  || 0,
            ppg:    main / Math.max(games, 1)
          };
        }).filter(function(a) { return a.ppg > 0; })
          .sort(function(a, b) { return b.ppg - a.ppg; });
      }

      mlbStatsCache = {
        hitters:  parseAthletes(batJ,   'hits',        'gamesPlayed'),
        pitchers: parseAthletes(pitchJ, 'strikeouts',  'gamesStarted')
      };
      return mlbStatsCache;
    } catch(e) { return { hitters:[], pitchers:[] }; }
  }

  function getTopHittersByTeam(stats, teamAbbr) {
    if (!stats || !stats.hitters || !teamAbbr) return [];
    return stats.hitters
      .filter(function (h) { return h.team.toLowerCase() === teamAbbr.toLowerCase(); })
      .slice(0, 3);
  }

  function enrichPitcherStats(stats, pitcherName) {
    if (!pitcherName || pitcherName === 'TBD' || !stats || !stats.pitchers) return null;
    var last = pitcherName.toLowerCase().split(' ').pop();
    return stats.pitchers.find(function (p) {
      return p.name.toLowerCase().includes(last);
    }) || null;
  }

  // ── MLB GAMES PANEL ───────────────────────────────────────────
  async function loadMLBGamesPanel(leagueKey) {
    mlbPanel.style.display = 'flex';
    mlbPanel.style.flexDirection = 'column';
    mlbPanel.style.gap = '14px';
    mlbPanel.innerHTML = '<div class="mlb-panel-loader">⏳ Cargando partidos y estadísticas...</div>';

    var espnMap  = ESPN_LEAGUE_MAP[leagueKey] || { sport:'baseball', league:'mlb' };
    var isNCAABB = leagueKey === 'baseball_ncaa';

    try {
      // Cargar en paralelo: scoreboard + stats + odds
      var fetchOdds = leagueKey !== 'baseball_ncaa'
        ? fetch(BASE + '/sports/' + leagueKey + '/odds/?apiKey=' + API_KEY + '&regions=eu&markets=h2h&oddsFormat=decimal')
        : Promise.resolve(null);

      var results = await Promise.all([
        fetch(ESPN + '/' + espnMap.sport + '/' + espnMap.league + '/scoreboard'),
        fetchMLBPlayerStats(espnMap.league),
        fetchOdds
      ]);

      var scoreData = results[0].ok ? await results[0].json() : null;
      var playerStats = results[1];
      var oddsData = [];
      if (results[2] && results[2].ok) {
        oddsData = await results[2].json();
        if (!Array.isArray(oddsData)) oddsData = [];
        var rem  = results[2].headers.get('x-requests-remaining');
        var used = results[2].headers.get('x-requests-used');
        if (rem !== null) quotaInfo.textContent = 'Créditos usados: ' + used + ' | Restantes: ' + rem;
      }

      var events = (scoreData && scoreData.events) || [];
      mlbPanel.innerHTML = '';

      if (events.length === 0) {
        mlbPanel.innerHTML = '<div class="mlb-panel-loader">📅 No hay partidos programados para hoy en esta liga.</div>';
        return;
      }

      var header = document.createElement('div');
      header.className   = 'mlb-panel-header';
      header.textContent = '⚾ ' + events.length + ' partido(s) programados hoy';
      mlbPanel.appendChild(header);

      for (var i = 0; i < events.length; i++) {
        var card = await buildMLBGameCard(events[i], oddsData, playerStats, leagueKey, espnMap);
        mlbPanel.appendChild(card);
      }
    } catch(e) {
      mlbPanel.innerHTML = '<div class="mlb-panel-loader">❌ Error: ' + e.message + '</div>';
    }
  }

  async function buildMLBGameCard(ev, oddsData, playerStats, leagueKey, espnMap) {
    var comp     = ev.competitions && ev.competitions[0];
    var homeComp = comp && (comp.competitors||[]).find(function(c){return c.homeAway==='home';});
    var awayComp = comp && (comp.competitors||[]).find(function(c){return c.homeAway==='away';});

    var homeTeam = (homeComp && homeComp.team && homeComp.team.displayName) || '—';
    var awayTeam = (awayComp && awayComp.team && awayComp.team.displayName) || '—';
    var homeAbbr = (homeComp && homeComp.team && homeComp.team.abbreviation) || '';
    var awayAbbr = (awayComp && awayComp.team && awayComp.team.abbreviation) || '';
    var homeLogo = (homeComp && homeComp.team && homeComp.team.logo) || '';
    var awayLogo = (awayComp && awayComp.team && awayComp.team.logo) || '';
    var gameTime = formatGameTime(ev.date);
    var status   = (ev.status && ev.status.type && ev.status.type.description) || '';
    var isLive   = ev.status && ev.status.type && !ev.status.type.completed && ev.status.type.id !== '1';

    // Pitchers desde ESPN probables
    var pitchers = { home: null, away: null };
    if (comp && comp.probables) {
      comp.probables.forEach(function(p) {
        var ath   = p.athlete || {};
        var stats = p.statistics || [];
        var era   = stats.find(function(s){return s.name==='ERA';});
        pitchers[p.homeAway] = { name: ath.displayName || 'TBD', era: era ? parseFloat(era.displayValue).toFixed(2) : '—' };
      });
    }
    if (!pitchers.home && !pitchers.away && comp) {
      (comp.competitors||[]).forEach(function(c) {
        if (c.probable) {
          var ath = c.probable.athlete || {};
          var stats = c.probable.statistics || [];
          var era = stats.find(function(s){return s.name==='ERA';});
          pitchers[c.homeAway] = { name: ath.displayName||'TBD', era: era ? parseFloat(era.displayValue).toFixed(2) : '—' };
        }
      });
    }

    // Enriquecer con K/G de playerStats
    var homePitcherStats = pitchers.home ? enrichPitcherStats(playerStats, pitchers.home.name) : null;
    var awayPitcherStats = pitchers.away ? enrichPitcherStats(playerStats, pitchers.away.name) : null;

    // Top hitters
    var homeHitters = getTopHittersByTeam(playerStats, homeAbbr);
    var awayHitters = getTopHittersByTeam(playerStats, awayAbbr);

    // Estadio y viento (solo MLB)
    var stadiumInfo = TEAM_STADIUM[homeTeam] || null;
    var windInfo    = null;
    if (stadiumInfo) windInfo = await fetchWindData(stadiumInfo.coords[0], stadiumInfo.coords[1]);

    // Odds
    var mktHome = 0.5, mktAway = 0.5, bestOddHome = 1, bestOddAway = 1, bkCount = 0;
    var oddsEv = oddsData.find(function(o) {
      var hL = homeTeam.toLowerCase(), aL = awayTeam.toLowerCase();
      var ohL = o.home_team.toLowerCase(), oaL = o.away_team.toLowerCase();
      return (ohL === hL && oaL === aL) || (ohL === aL && oaL === hL) ||
             (hL.includes(ohL.split(' ').pop()) || ohL.includes(hL.split(' ').pop()));
    });

    if (oddsEv) {
      var pA = getAvgProb([oddsEv], oddsEv.home_team);
      var pB = getAvgProb([oddsEv], oddsEv.away_team);
      if (pA && pB) {
        var tot = pA + pB;
        var rawHome = pA / tot, rawAway = pB / tot;
        // Ajustar si los equipos están volteados
        if (oddsEv.home_team.toLowerCase().includes(homeTeam.toLowerCase().split(' ').pop()) ||
            homeTeam.toLowerCase().includes(oddsEv.home_team.toLowerCase().split(' ').pop())) {
          mktHome = rawHome; mktAway = rawAway;
        } else {
          mktHome = rawAway; mktAway = rawHome;
        }
        if (mktHome < 0.05 || mktAway < 0.05) { mktHome = 0.5; mktAway = 0.5; oddsEv = null; }
      }
      if (oddsEv) {
        bestOddHome = getBestOdd(oddsEv, homeTeam);
        bestOddAway = getBestOdd(oddsEv, awayTeam);
        var bks = new Set();
        oddsEv.bookmakers.forEach(function(b){ bks.add(b.key); });
        bkCount = bks.size;
      }
    }

    // Modelo: odds + park factor
    var pfAdj     = stadiumInfo ? (stadiumInfo.pf - 1) * 0.05 : 0;
    var modelHome = mktHome + pfAdj;
    var modelAway = mktAway;
    var totM      = modelHome + modelAway;
    modelHome /= totM; modelAway /= totM;
    var edgeHome  = modelHome - mktHome;
    var edgeAway  = modelAway - mktAway;
    var betIsHome = Math.abs(edgeHome) >= Math.abs(edgeAway);
    var betTeam   = betIsHome ? homeTeam : awayTeam;
    var betEdge   = betIsHome ? edgeHome : edgeAway;
    var betModel  = betIsHome ? modelHome : modelAway;
    var betMkt    = betIsHome ? mktHome : mktAway;
    var betOdd    = betIsHome ? bestOddHome : bestOddAway;
    var evVal     = oddsEv ? (betModel * (betOdd - 1)) - (1 - betModel) : null;

    // Semáforo
    var recClass, recLabel;
    var pitchersOK  = (pitchers.home && pitchers.home.name !== 'TBD') || (pitchers.away && pitchers.away.name !== 'TBD');
    var windStrong  = windInfo && windInfo.speed > 20;
    var hasGoodOdds = oddsEv && bkCount >= 3 && betOdd > 1 && betOdd < 10;

    if (oddsEv && betEdge > 0.07 && !windStrong && hasGoodOdds) {
      recClass = 'rec-good';  recLabel = '🟢 BUENO — Apostar: ' + betTeam + ' · Edge +' + Math.round(betEdge*100) + '%';
    } else if (oddsEv && betEdge > 0.03) {
      recClass = 'rec-tight'; recLabel = '🟡 APRETADO — ' + (pitchersOK ? 'Pitchers confirmados' : 'Pitchers TBD') + ' · Edge +' + Math.round(betEdge*100) + '%';
    } else {
      recClass = 'rec-avoid'; recLabel = '🔴 EVITAR — ' + (!oddsEv ? 'Sin odds disponibles' : 'Edge insuficiente');
    }

    // ── HTML del pitcher ──
    function pitcherHTML(p, ps) {
      var name  = (p && p.name !== 'TBD') ? p.name : '🔄 TBD';
      var era   = (p && p.era) ? p.era : '—';
      var kpg   = ps ? ps.ppg.toFixed(1) : '—';
      var kStar = ps && ps.ppg >= 8 ? '<span class="kstar">⭐</span>' : ps && ps.ppg >= 6 ? '<span class="kstar">✔</span>' : '';
      var kColor= ps && ps.ppg >= 8 ? '#2cb67d' : ps && ps.ppg >= 6 ? '#ffd700' : '#aaa';
      return '<div class="mlb-row"><span>⚾ Pitcher</span><span>' + name + '</span></div>' +
             '<div class="mlb-row"><span>ERA</span><span>' + era + '</span></div>' +
             '<div class="mlb-row"><span>K/salida</span><span style="color:' + kColor + '">' + kpg + kStar + '</span></div>';
    }

    // ── HTML de bateadores ──
    function hittersHTML(hitters) {
      if (!hitters || hitters.length === 0)
        return '<div style="color:#555;font-size:0.75rem;padding:4px 0">Sin datos aún</div>';
      return hitters.map(function(h) {
        var hp
