// eatlist — Shared UI Components
const { useState, useEffect, useRef } = React;

// ── Tokens ────────────────────────────────────────────────────────
const CORAL = '#EB6558';
const DARK = '#050615';
const GREEN = '#71CC97';
const GRAY = '#8D9091';
const LGRAY = '#F4F4F4';

const getC = (dark) => ({
  bg: dark ? '#05061 5' : '#FFFFFF',
  surf: dark ? '#1C1B1F' : '#F4F4F4',
  card: dark ? '#252525' : '#FFFFFF',
  text: dark ? '#FFFFFF' : '#05061 5',
  textMed: dark ? '#D0D0D0' : '#3C3736',
  textSec: '#8D9091',
  border: dark ? '#2D2D2D' : '#EEEEEE',
  coral: CORAL, green: GREEN,
  inputBg: dark ? '#1C1B1F' : '#F4F4F4',
  pillBg: dark ? '#2D2D2D' : '#FFFFFF',
  shadow: dark ?
  '0 2px 8px rgba(0,0,0,0.5)' :
  '0 2px 4px rgba(0,0,0,0.06),0 4px 6px rgba(0,0,0,0.1)'
});

const ts = (size, weight = 400, color) => ({
  fontFamily: "'DM Sans', sans-serif",
  fontSize: size,
  fontWeight: weight,
  letterSpacing: '-0.05em',
  lineHeight: 1.2,
  ...(color ? { color } : {})
});

Object.assign(window, { getC, ts, CORAL, DARK, GREEN, GRAY, LGRAY });

// ── StatusBar ─────────────────────────────────────────────────────
const StatusBar = ({ dark }) => {
  const c = getC(dark);
  return (
    <div style={{ height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
      <span style={{ ...ts(15, 600), color: c.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" viewBox="0 0 17 12">
          {[0, 1, 2, 3].map((i) =>
          <rect key={i} x={i * 4.25} y={9 - i * 2.5} width="3.5" height={3 + i * 2.5} rx="0.8" fill={c.text} opacity={0.4 + i * 0.2} />
          )}
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={c.text} strokeWidth="1.4" strokeLinecap="round">
          <path d="M.5 4C3.8.7 12.2.7 15.5 4" /><path d="M3 7c2-2.3 8-2.3 10 0" />
          <circle cx="8" cy="10" r="1" fill={c.text} stroke="none" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 24, height: 12, border: `1.5px solid ${c.text}60`, borderRadius: 3.5, padding: '1.5px 2px' }}>
            <div style={{ width: '82%', height: '100%', background: c.text, borderRadius: 2 }} />
          </div>
          <div style={{ width: 2, height: 6, background: `${c.text}50`, borderRadius: '0 1.5px 1.5px 0', marginLeft: 1 }} />
        </div>
      </div>
    </div>);

};

// ── Logo ──────────────────────────────────────────────────────────
const AppLogomark = ({ color = DARK, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
    <path d="M22.5503 51.1206C25.9262 50.5146 29.1724 49.3491 32.5099 48.5743C35.2624 47.9351 37.8459 47.0116 40.5451 46.1848C53.2862 42.2843 51.8814 45.5188 40.4911 35.2055C39.514 34.3205 37.6636 33.7213 37.2672 32.244C36.4855 29.3299 42.2864 19.6016 43.594 17.4493C45.52 14.2803 32.1051 6.5915 29.5623 3.954" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.1451 50.8673C20.0013 48.2918 17.1909 46.4302 14.689 44.2325C4.40657 35.1995 9.07298 35.1788 13.7174 22.9759C13.8619 22.5951 15.1697 20.4558 15.052 20.0173C14.8624 19.3105 13.5679 19.8497 12.9102 19.5271C8.62132 17.4178 4.88261 14.3768 1.00016 11.7195" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.22551 11.702C10.2539 9.19623 20.5497 7.13115 29.3509 3.89591" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.2648 38.5271C11.229 39.0895 9.40909 38.4649 9.65205 38.2495C11.5416 36.5749 30.9435 35.4126 36.2561 32.9019" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.7258 20.0275C22.3282 18.2312 33.4805 16.5459 42.1384 15.1319" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EatlistWordmark = ({ dark: isDark = false, size = 'md' }) => {
  const h = size === 'lg' ? 36 : size === 'sm' ? 22 : 28;
  const col = isDark ? 'white' : DARK;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <AppLogomark color={col} size={h} />
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: h * 0.72, fontWeight: 600, color: col, letterSpacing: '-0.03em' }}>eatlist</span>
    </div>
  );
};

// ── AppHeader ─────────────────────────────────────────────────────
const AppHeader = ({ dark, onListsOpen, onProfile }) => {
  const c = getC(dark);
  return (
    <div style={{ padding: '0 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: c.bg, borderBottom: `1px solid ${c.border}` }}>
      <EatlistWordmark dark={dark} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onListsOpen} style={{ width: 36, height: 36, borderRadius: 100, background: CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlusIc s={18} col="white" />
        </button>
        <button onClick={onProfile} style={{ width: 36, height: 36, borderRadius: 100, overflow: 'hidden', border: `2px solid ${c.border}`, cursor: 'pointer', padding: 0, background: 'none' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&crop=face" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>
    </div>);

};

// ── NavHeader (back nav) ──────────────────────────────────────────
const NavHeader = ({ dark, onBack, title, right }) => {
  const c = getC(dark);
  return (
    <div style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bg, borderBottom: `1px solid ${c.border}` }}>
      <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
        <BackIc s={22} col={c.text} />
      </button>
      {title && <span style={{ ...ts(18, 700), color: c.text }}>{title}</span>}
      <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>{right || null}</div>
    </div>);

};

// ── SearchInput ───────────────────────────────────────────────────
const SearchInput = ({ dark, value, onChange, onFocus, placeholder = 'Buscar', autoFocus = false }) => {
  const c = getC(dark);
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <SearchIc s={16} col={GRAY} />
      </div>
      <input
        value={value} onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={onFocus} placeholder={placeholder} autoFocus={autoFocus}
        style={{ width: '100%', height: 40, background: c.inputBg, border: 'none', borderRadius: 100, paddingLeft: 36, paddingRight: 12, ...ts(14), color: c.text, outline: 'none', caretColor: CORAL }} />
      
    </div>);

};

// ── Pill / Badge ──────────────────────────────────────────────────
const Pill = ({ label, active = false, dark, onClick, color }) => {
  const c = getC(dark);
  const bg = active ? CORAL : c.surf;
  const col = active ? 'white' : c.textSec;
  return (
    <button onClick={onClick} style={{ height: 33, padding: '0 14px', borderRadius: 100, background: color || bg, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, ...ts(14, 700), color: color ? 'white' : col }}>
      {label}
    </button>);

};

// ── ListCard (small, 2-col grid) ──────────────────────────────────
const ListCard = ({ list, dark, onClick }) => {
  const c = getC(dark);
  return (
    <div onClick={onClick} style={{ width: 158, flexShrink: 0, cursor: 'pointer' }}>
      <div style={{ width: 158, height: 158, borderRadius: 16, overflow: 'hidden', background: c.surf, marginBottom: 8 }}>
        <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ ...ts(18, 500), color: c.text, lineHeight: 1.1, marginBottom: 4 }}>{list.title}</div>
      <div style={{ ...ts(14), color: GRAY }}>{list.author}</div>
    </div>);

};

// ── ListCardHorizontal (in search / profile) ──────────────────────
const ListCardHoriz = ({ list, dark, onClick }) => {
  const c = getC(dark);
  return (
    <div onClick={onClick} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', cursor: 'pointer', borderBottom: `1px solid ${c.border}` }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: c.surf }}>
        <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...ts(16, 500), color: c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{list.title}</div>
        <div style={{ ...ts(13), color: GRAY }}>{list.author} · {list.followers} seguidores</div>
      </div>
      <ArrowRightIc s={18} col={GRAY} />
    </div>);

};

// ── RestaurantCard (in list-open) ─────────────────────────────────
const RestaurantCard = ({ restaurant, dark, onOpen, onPlusClick, onLikesClick }) => {
  const c = getC(dark);
  const friends = window.DATA.friends;
  const lpTimer = useRef(null);

  const startLP = (type, e) => {
    e.stopPropagation();
    lpTimer.current = setTimeout(() => { lpTimer.current = 'fired'; onLikesClick && onLikesClick(type); }, 500);
  };
  const cancelLP = () => { if (lpTimer.current && lpTimer.current !== 'fired') clearTimeout(lpTimer.current); lpTimer.current = null; };

  const LikesBadge = ({ type, count }) => {
    if (count === 0) return null;
    const col = type === 'up' ? GREEN : CORAL;
    const avatars = friends.slice(0, Math.min(count, 3));
    return (
      <div
        onPointerDown={e => startLP(type, e)}
        onPointerUp={e => { e.stopPropagation(); cancelLP(); }}
        onPointerLeave={cancelLP}
        onContextMenu={e => e.preventDefault()}
        style={{ display: 'flex', alignItems: 'center', gap: 5, background: c.bg, borderRadius: 100, padding: '5px 10px', cursor: 'pointer', userSelect: 'none' }}>
        {type === 'up' ? <ThumbUpIc s={13} col={col}/> : <ThumbDownIc s={13} col={col}/>}
        <span style={{ ...ts(13, 700), color: GRAY }}>{count}</span>
        {avatars.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {avatars.map((f, i) => (
              <img key={f.id} src={f.avatar} style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${c.surf}`, marginLeft: i === 0 ? 2 : -5, position: 'relative', zIndex: avatars.length - i }}/>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div onClick={onOpen} style={{ background: c.surf, borderRadius: 16, padding: '20px 20px 18px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <button onClick={e => { e.stopPropagation(); onPlusClick && onPlusClick(); }}
          style={{ width: 32, height: 32, borderRadius: 100, background: CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PlusIc s={15} col="white"/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ ...ts(20, 500), color: c.text, lineHeight: 1.1 }}>{restaurant.name}</div>
        </div>
        <ArrowRightIc s={18} col={GRAY}/>
      </div>
      <div style={{ ...ts(13), color: GRAY, marginBottom: 10, paddingLeft: 44 }}>{restaurant.address}</div>
      <div style={{ display: 'flex', gap: 8, paddingLeft: 44 }}>
        <LikesBadge type="up" count={restaurant.friendsLiked}/>
        <LikesBadge type="down" count={restaurant.friendsDisliked}/>
      </div>
    </div>
  );
};

// ── LeafletMap ────────────────────────────────────────────────────
const LeafletMap = ({ dark, center, zoom = 14, markers = [], onMarkerClick, style: mapStyle = {}, activeFilter = 'Todos' }) => {
  const ref = useRef(null);
  const mapR = useRef(null);
  const tileR = useRef(null);
  const layerGroupR = useRef(null);

  const tileUrl = (d) => d ?
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const addMarkers = (map, mkList, clickHandler) => {
    mkList.forEach((m) => {
      const isSaved = m.saved;
      const isFriend = !isSaved && m.friendsLiked > 0;
      const bg = isSaved ? CORAL : isFriend ? '#050615' : '#8D9091';
      const iconSvg = isSaved
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
        : isFriend
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:32px;height:32px;background:${bg};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;">${iconSvg}</div>`,
        iconSize: [32, 32], iconAnchor: [16, 16]
      });
      const mk = L.marker([m.lat, m.lng], { icon }).addTo(layerGroupR.current);
      if (clickHandler) mk.on('click', () => clickHandler(m));
    });
  };

  useEffect(() => {
    if (!ref.current || mapR.current) return;
    const map = L.map(ref.current, { zoomControl: false, attributionControl: false }).setView(center, zoom);
    mapR.current = map;
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    layerGroupR.current = L.layerGroup().addTo(map);
    addMarkers(map, markers, onMarkerClick);
    return () => {if (mapR.current) {mapR.current.remove();mapR.current = null;}};
  }, []);

  useEffect(() => {
    if (!mapR.current || !layerGroupR.current) return;
    layerGroupR.current.clearLayers();
    addMarkers(mapR.current, markers, onMarkerClick);
  }, [markers]);

  useEffect(() => {
    if (!mapR.current || !tileR.current) return;
    mapR.current.removeLayer(tileR.current);
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(mapR.current);
  }, [dark]);

  return <div ref={ref} style={{ width: '100%', height: '100%', ...mapStyle }} />;
};

// ── MiniMap (static preview) ──────────────────────────────────────
const MiniMap = ({ dark, markers, onClick, style: s = {} }) => {
  const mapId = useRef(`minimap-${Math.random().toString(36).slice(2)}`);
  const mapR = useRef(null);
  const tileR = useRef(null);
  const tileUrl = (d) => d ?
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    const el = document.getElementById(mapId.current);
    if (!el || mapR.current) return;
    const map = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false }).setView([-23.5505, -46.6333], 13);
    mapR.current = map;
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    (markers || []).forEach((m) => {
      const icon = L.divIcon({ className: '', html: `<div style="width:20px;height:20px;background:${CORAL};border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
      L.marker([m.lat, m.lng], { icon }).addTo(map);
    });
    return () => {if (mapR.current) {mapR.current.remove();mapR.current = null;}};
  }, []);

  useEffect(() => {
    if (!mapR.current || !tileR.current) return;
    mapR.current.removeLayer(tileR.current);
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(mapR.current);
  }, [dark]);

  return <div id={mapId.current} onClick={onClick} style={{ width: '100%', height: '100%', cursor: 'pointer', ...s }} />;
};

// ── FriendRow ─────────────────────────────────────────────────────
const FriendRow = ({ friend, dark }) => {
  const c = getC(dark);
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px', background: c.surf, borderRadius: 14 }}>
      <img src={friend.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
      <span style={{ ...ts(17), color: c.text, flex: 1 }}>{friend.name}</span>
      <ArrowRightIc s={16} col={GRAY} />
    </div>);

};

// ── FeedCard (friend activity) ────────────────────────────────────
const FeedCard = ({ item, list, dark, go, isLast }) => {
  const c = getC(dark);
  const [following, setFollowing] = useState(item.following || false);
  return (
    <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: isLast ? 'none' : `1px solid ${c.border}` }}>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <img src={item.friend.avatar} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div>
          <div style={{ ...ts(15, 700), color: c.text, fontWeight: "400" }}>{item.friend.name}</div>
          <div style={{ ...ts(12), color: GRAY }}>{item.action} · {item.time} · seguindo</div>
        </div>
      </div>
      {/* List title + description */}
      <div onClick={() => go('list-open', { listId: list.id })} style={{ cursor: 'pointer', marginBottom: 14 }}>
        <div style={{ ...ts(22, 700), color: c.text, lineHeight: 1.1, marginBottom: 6, fontWeight: "400" }}>{list.title}</div>

      </div>

      {/* Restaurant photos */}
      <div style={{ display: 'flex', gap: 10 }}>
        {list.restaurants.slice(0, 2).map((r) =>
        <div key={r.id} onClick={() => go('restaurant', { restaurantId: r.id })}
        style={{ flex: 1, height: 128, borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <img src={r.photo || list.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10, ...ts(13, 600), color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{r.name}</span>
          </div>
        )}
      </div>
    </div>);

};

Object.assign(window, {
  StatusBar, AppLogomark, EatlistWordmark,
  AppHeader, NavHeader, SearchInput, Pill,
  ListCard, ListCardHoriz, RestaurantCard,
  LeafletMap, MiniMap, FriendRow, FeedCard
});