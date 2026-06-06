// eatlist — Shared UI Components
const { useState, useEffect, useRef } = React;

// ── Design token values (mirrors CSS custom properties) ────────────
const INK           = '#050615';
const CREAM         = '#F4EFE6';
const SURFACE       = '#FFFFFF';
const SURFACE_MUTED = '#F0EBE1';
const COBALT        = '#1D38C0';
const COBALT_MUTED  = '#E8ECF9';
const SEC_TEXT      = '#7A7470';
const BORDER        = '#E0D9CF';
const DESTRUCTIVE   = '#B5362A';

// Legacy aliases kept for map markers and feature-level colors that
// are not part of the UI chrome (liked/disliked indicators).
const DARK = INK;
const GRAY = SEC_TEXT;

const getC = () => ({
  bg:       CREAM,
  surf:     SURFACE_MUTED,
  card:     SURFACE,
  text:     INK,
  textSec:  SEC_TEXT,
  border:   BORDER,
  cobalt:   COBALT,
  cobaltMuted: COBALT_MUTED,
  destructive: DESTRUCTIVE,
});

// Typography helper — only size/weight/color; no global letter-spacing override
const ts = (size, weight = 400, color) => ({
  fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.5,
  ...(color ? { color } : {}),
});

Object.assign(window, { getC, ts, INK, CREAM, SURFACE, SURFACE_MUTED, COBALT, COBALT_MUTED, SEC_TEXT, BORDER, DESTRUCTIVE, DARK, GRAY, UserRow });

// ── StatusBar ─────────────────────────────────────────────────────
const StatusBar = () => (
  <div style={{ height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
    <span style={{ ...ts(15, 600), color: INK }}>9:41</span>
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <svg width="17" height="12" viewBox="0 0 17 12">
        {[0, 1, 2, 3].map(i =>
          <rect key={i} x={i * 4.25} y={9 - i * 2.5} width="3.5" height={3 + i * 2.5} rx="0.8" fill={INK} opacity={0.3 + i * 0.2} />
        )}
      </svg>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round">
        <path d="M.5 4C3.8.7 12.2.7 15.5 4"/><path d="M3 7c2-2.3 8-2.3 10 0"/>
        <circle cx="8" cy="10" r="1" fill={INK} stroke="none"/>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 24, height: 12, border: `1.5px solid ${INK}60`, borderRadius: 3.5, padding: '1.5px 2px' }}>
          <div style={{ width: '82%', height: '100%', background: INK, borderRadius: 2 }}/>
        </div>
        <div style={{ width: 2, height: 6, background: `${INK}50`, borderRadius: '0 1.5px 1.5px 0', marginLeft: 1 }}/>
      </div>
    </div>
  </div>
);

// ── Logo ──────────────────────────────────────────────────────────
const AppLogomark = ({ color = INK, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
    <path d="M22.5503 51.1206C25.9262 50.5146 29.1724 49.3491 32.5099 48.5743C35.2624 47.9351 37.8459 47.0116 40.5451 46.1848C53.2862 42.2843 51.8814 45.5188 40.4911 35.2055C39.514 34.3205 37.6636 33.7213 37.2672 32.244C36.4855 29.3299 42.2864 19.6016 43.594 17.4493C45.52 14.2803 32.1051 6.5915 29.5623 3.954" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.1451 50.8673C20.0013 48.2918 17.1909 46.4302 14.689 44.2325C4.40657 35.1995 9.07298 35.1788 13.7174 22.9759C13.8619 22.5951 15.1697 20.4558 15.052 20.0173C14.8624 19.3105 13.5679 19.8497 12.9102 19.5271C8.62132 17.4178 4.88261 14.3768 1.00016 11.7195" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.22551 11.702C10.2539 9.19623 20.5497 7.13115 29.3509 3.89591" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.2648 38.5271C11.229 39.0895 9.40909 38.4649 9.65205 38.2495C11.5416 36.5749 30.9435 35.4126 36.2561 32.9019" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.7258 20.0275C22.3282 18.2312 33.4805 16.5459 42.1384 15.1319" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EatlistWordmark = ({ onDark = false, size = 'md' }) => {
  const h = size === 'lg' ? 36 : size === 'sm' ? 22 : 28;
  const col = onDark ? SURFACE : INK;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <AppLogomark color={col} size={h}/>
      <span style={{ fontFamily: "var(--font-ui, 'DM Sans', sans-serif)", fontSize: h * 0.72, fontWeight: 600, color: col, letterSpacing: '-0.02em' }}>eatlist</span>
    </div>
  );
};

// ── AppHeader ─────────────────────────────────────────────────────
const AppHeader = ({ onListsOpen, onProfile }) => (
  <div style={{ padding: '0 var(--space-4, 16px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: CREAM, borderBottom: `1px solid ${BORDER}`, height: 56, flexShrink: 0 }}>
    <AppLogomark size={32}/>
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={onListsOpen} aria-label="Nova lista"
        style={{ width: 44, height: 44, borderRadius: 'var(--radius-md, 8px)', background: INK, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PlusIc s={18} col={SURFACE}/>
      </button>
      <button onClick={onProfile} aria-label="Perfil"
        style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: `1px solid ${BORDER}`, cursor: 'pointer', padding: 0, background: 'none' }}>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&crop=face" alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </button>
    </div>
  </div>
);

// ── NavHeader (back nav) ──────────────────────────────────────────
const NavHeader = ({ onBack, title, right }) => (
  <div style={{ padding: '0 var(--space-4, 16px)', display: 'flex', alignItems: 'center', height: 56, background: CREAM, borderBottom: `1px solid ${BORDER}`, gap: 8, flexShrink: 0 }}>
    <button onClick={onBack} aria-label="Voltar"
      style={{ width: 44, height: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 'var(--radius-md, 8px)' }}>
      <BackIc s={22} col={INK}/>
    </button>
    {title && (
      <span style={{ flex: 1, fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, lineHeight: 1.4, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {title}
      </span>
    )}
    <div style={{ width: 44, display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>{right || null}</div>
  </div>
);

// ── SearchInput ───────────────────────────────────────────────────
const SearchInput = ({ value, onChange, onFocus, placeholder = 'Buscar', autoFocus = false }) => (
  <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <SearchIc s={16} col={SEC_TEXT}/>
    </div>
    <input
      value={value} onChange={e => onChange && onChange(e.target.value)}
      onFocus={onFocus} placeholder={placeholder} autoFocus={autoFocus}
      style={{ width: '100%', height: 48, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-lg, 12px)', paddingLeft: 36, paddingRight: 12, fontFamily: "var(--font-ui, 'DM Sans', sans-serif)", fontSize: 'var(--text-base, 15px)', color: INK, outline: 'none', caretColor: COBALT }}
    />
  </div>
);

// ── Tag / Chip ────────────────────────────────────────────────────
// variant: 'default' | 'active' | 'accent' | 'muted'
const Tag = ({ label, variant = 'default', onClick, compact = false }) => {
  const styles = {
    default: { background: 'transparent', border: `1px solid ${BORDER}`,   color: INK      },
    active:  { background: INK,           border: `1px solid ${INK}`,       color: SURFACE  },
    accent:  { background: COBALT_MUTED,  border: 'none',                   color: COBALT   },
    muted:   { background: SURFACE_MUTED, border: 'none',                   color: SEC_TEXT },
  };
  const s = styles[variant] || styles.default;
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', height: compact ? 22 : 28, padding: `0 ${compact ? 8 : 12}px`, borderRadius: 'var(--radius-pill, 9999px)', fontFamily: "var(--font-ui, 'DM Sans', sans-serif)", fontSize: 'var(--text-xs, 11px)', fontWeight: 500, lineHeight: 1, whiteSpace: 'nowrap', cursor: onClick ? 'pointer' : 'default', border: s.border, background: s.background, color: s.color, transition: `background ${150}ms`, userSelect: 'none' }}>
      {label}
    </Tag>
  );
};

// ── UserRow (el-user-row spec) ────────────────────────────────────
const UserRow = ({ friend }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', minHeight: 64 }}>
    <img src={friend.avatar} alt={friend.name} width={40} height={40}
      style={{ width: 40, height: 40, borderRadius: 'var(--radius-pill, 9999px)', objectFit: 'cover', flexShrink: 0 }}/>
    <span style={{ fontFamily: "var(--font-ui, 'DM Sans', sans-serif)", fontSize: 'var(--text-md, 17px)', fontWeight: 400, color: INK }}>
      {friend.name}
    </span>
  </div>
);

// Backward-compat pill (used in search/map filters)
const Pill = ({ label, active = false, onClick }) => (
  <Tag label={label} variant={active ? 'active' : 'default'} onClick={onClick}/>
);

// ── ListCard (small, 2-col grid) ──────────────────────────────────
const ListCard = ({ list, onClick }) => (
  <div onClick={onClick} style={{ width: 158, flexShrink: 0, cursor: 'pointer' }}>
    <div style={{ width: 158, height: 158, borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden', background: SURFACE_MUTED, marginBottom: 8, border: `1px solid ${BORDER}` }}>
      <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
    </div>
    <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK, lineHeight: 1.4, marginBottom: 4 }}>{list.title}</div>
    <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT }}>{list.author}</div>
  </div>
);

// ── ListCardHorizontal ────────────────────────────────────────────
const ListCardHoriz = ({ list, onClick }) => (
  <div onClick={onClick} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', cursor: 'pointer', borderBottom: `1px solid ${BORDER}` }}>
    <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden', flexShrink: 0, background: SURFACE_MUTED, border: `1px solid ${BORDER}` }}>
      <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{list.title}</div>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT }}>{list.author} · {list.followers} seguidores</div>
    </div>
    <ArrowRightIc s={18} col={SEC_TEXT}/>
  </div>
);

// ── RestaurantCard (in list-open) ─────────────────────────────────
const RestaurantCard = ({ restaurant, onOpen, onPlusClick, onLikesClick }) => {
  const friends = window.DATA.friends;
  const lpTimer = useRef(null);

  const startLP = (type, e) => {
    e.stopPropagation();
    lpTimer.current = setTimeout(() => { lpTimer.current = 'fired'; onLikesClick && onLikesClick(type); }, 500);
  };
  const cancelLP = () => { if (lpTimer.current && lpTimer.current !== 'fired') clearTimeout(lpTimer.current); lpTimer.current = null; };

  const LikesBadge = ({ type, count }) => {
    if (count === 0) return null;
    const col = INK;
    const avatars = friends.slice(0, Math.min(count, 3));
    return (
      <div
        onPointerDown={e => startLP(type, e)} onPointerUp={e => { e.stopPropagation(); cancelLP(); }}
        onPointerLeave={cancelLP} onContextMenu={e => e.preventDefault()}
        style={{ display: 'flex', alignItems: 'center', gap: 5, background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-pill, 9999px)', padding: '5px 10px', cursor: 'pointer', userSelect: 'none' }}>
        {type === 'up' ? <ThumbUpIc s={13} col={col}/> : <ThumbDownIc s={13} col={col}/>}
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: SEC_TEXT }}>{count}</span>
        {avatars.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {avatars.map((f, i) => (
              <img key={f.id} src={f.avatar} alt={f.name} style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${SURFACE}`, marginLeft: i === 0 ? 2 : -5, position: 'relative', zIndex: avatars.length - i }}/>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <article onClick={onOpen} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', padding: 'var(--space-4, 16px)', cursor: 'pointer', transition: `background ${150}ms` }}
      onMouseEnter={e => e.currentTarget.style.background = SURFACE_MUTED}
      onMouseLeave={e => e.currentTarget.style.background = SURFACE}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <button onClick={e => { e.stopPropagation(); onPlusClick && onPlusClick(); }} aria-label="Adicionar a lista"
          style={{ width: 32, height: 32, borderRadius: 'var(--radius-md, 8px)', background: INK, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PlusIc s={14} col={SURFACE}/>
        </button>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-md, 17px)', fontWeight: 600, color: INK, lineHeight: 1.5, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{restaurant.name}</h3>
        </div>
        <ArrowRightIc s={18} col={SEC_TEXT}/>
      </div>
      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 10, paddingLeft: 44 }}>{restaurant.address}</div>
      <div style={{ display: 'flex', gap: 8, paddingLeft: 44 }}>
        <LikesBadge type="up" count={restaurant.friendsLiked}/>
        <LikesBadge type="down" count={restaurant.friendsDisliked}/>
      </div>
    </article>
  );
};

// ── LeafletMap ────────────────────────────────────────────────────
const LeafletMap = ({ center, zoom = 14, markers = [], onMarkerClick, style: mapStyle = {} }) => {
  const ref = useRef(null);
  const mapR = useRef(null);
  const tileR = useRef(null);
  const layerGroupR = useRef(null);

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const addMarkers = (map, mkList, clickHandler) => {
    mkList.forEach(m => {
      const isLiked = (m.likes > 0) || (m.friendsLiked > 0);
      const isSaved = m.saved;
      if (!isLiked && !isSaved) return; // thumbs-down-only: never shown on map
      const pinHtml = isLiked
        ? `<div style="width:32px;height:32px;background:${INK};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(5,6,21,0.25);cursor:pointer;"><svg width="14" height="14" viewBox="0 0 24 24" stroke="${CREAM}" stroke-width="1.5" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></div>`
        : `<div style="width:32px;height:32px;background:${CREAM};border:2px solid ${INK};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(5,6,21,0.15);cursor:pointer;box-sizing:border-box;"><svg width="14" height="14" viewBox="0 0 24 24" stroke="${INK}" stroke-width="1.5" fill="none"><polyline points="20,6 9,17 4,12"/></svg></div>`;
      const icon = L.divIcon({
        className: '',
        html: pinHtml,
        iconSize: [32, 32], iconAnchor: [16, 16],
      });
      const mk = L.marker([m.lat, m.lng], { icon }).addTo(layerGroupR.current);
      if (clickHandler) mk.on('click', () => clickHandler(m));
    });
  };

  useEffect(() => {
    if (!ref.current || mapR.current) return;
    const map = L.map(ref.current, { zoomControl: false, attributionControl: false }).setView(center, zoom);
    mapR.current = map;
    tileR.current = L.tileLayer(tileUrl, { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    layerGroupR.current = L.layerGroup().addTo(map);
    addMarkers(map, markers, onMarkerClick);
    return () => { if (mapR.current) { mapR.current.remove(); mapR.current = null; } };
  }, []);

  useEffect(() => {
    if (!mapR.current || !layerGroupR.current) return;
    layerGroupR.current.clearLayers();
    addMarkers(mapR.current, markers, onMarkerClick);
  }, [markers]);

  return <div ref={ref} style={{ width: '100%', height: '100%', ...mapStyle }}/>;
};

// ── MiniMap ───────────────────────────────────────────────────────
const MiniMap = ({ markers, onClick, style: s = {} }) => {
  const mapId = useRef(`minimap-${Math.random().toString(36).slice(2)}`);
  const mapR = useRef(null);

  useEffect(() => {
    const el = document.getElementById(mapId.current);
    if (!el || mapR.current) return;
    const map = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false }).setView([-23.5505, -46.6333], 13);
    mapR.current = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    (markers || []).forEach(m => {
      const icon = L.divIcon({ className: '', html: `<div style="width:20px;height:20px;background:${INK};border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(5,6,21,0.3);"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
      L.marker([m.lat, m.lng], { icon }).addTo(map);
    });
    return () => { if (mapR.current) { mapR.current.remove(); mapR.current = null; } };
  }, []);

  return <div id={mapId.current} onClick={onClick} style={{ width: '100%', height: '100%', cursor: 'pointer', ...s }}/>;
};

// ── FriendRow ─────────────────────────────────────────────────────
const FriendRow = ({ friend }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 'var(--space-3, 12px)', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)' }}>
    <img src={friend.avatar} alt={friend.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}/>
    <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: INK, flex: 1 }}>{friend.name}</span>
    <ArrowRightIc s={16} col={SEC_TEXT}/>
  </div>
);

// ── FeedCard ──────────────────────────────────────────────────────
const FeedCard = ({ item, list, go, isLast }) => (
  <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: isLast ? 'none' : `1px solid ${BORDER}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <img src={item.friend.avatar} alt={item.friend.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
      <div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK }}>{item.friend.name}</div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>{item.action} · {item.time}</div>
      </div>
    </div>
    <div onClick={() => go('list-open', { listId: list.id })} style={{ cursor: 'pointer', marginBottom: 14 }}>
      <div style={{ fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK, lineHeight: 1.4, marginBottom: 4 }}>{list.title}</div>
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      {list.restaurants.slice(0, 2).map(r =>
        <div key={r.id} onClick={() => go('restaurant', { restaurantId: r.id })}
          style={{ flex: 1, height: 120, borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden', position: 'relative', cursor: 'pointer', border: `1px solid ${BORDER}` }}>
          <img src={r.photo || list.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,6,21,0.6) 0%, transparent 55%)' }}/>
          <span style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: 'white' }}>{r.name}</span>
        </div>
      )}
    </div>
  </div>
);

Object.assign(window, {
  StatusBar, AppLogomark, EatlistWordmark,
  AppHeader, NavHeader, SearchInput, Tag, Pill,
  ListCard, ListCardHoriz, RestaurantCard,
  LeafletMap, MiniMap, FriendRow, FeedCard,
});
