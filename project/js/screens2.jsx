// eatlist — Screens: Map, ListsGrid, ListOpen, Restaurant, Profile
const { useState, useEffect, useRef } = React;

// ── BottomSheet wrapper ───────────────────────────────────────────
const BottomSheet = ({ onClose, children }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 500 }}>
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(5,6,21,0.4)' }}/>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 'auto', maxHeight: '90dvh', background: CREAM, borderRadius: 'var(--radius-xl, 16px) var(--radius-xl, 16px) 0 0', boxShadow: 'var(--shadow-sheet, 0 -2px 16px rgba(5,6,21,0.08))', display: 'flex', flexDirection: 'column', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div style={{ width: 36, height: 4, background: `${SEC_TEXT}40`, borderRadius: 2, margin: '8px auto 4px', flexShrink: 0 }}/>
      {children}
    </div>
  </div>
);

// ── MapScreen ─────────────────────────────────────────────────────
const MapScreen = ({ go, allLists }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const filters = ['Todos', 'Abertos agora', 'Salvos', 'Amigos gostaram'];

  const allRestaurants = allLists.flatMap(l =>
    l.restaurants.map(r => ({ ...r, listTitle: l.title, listCategory: l.category }))
  );

  const byFilter = activeFilter === 'Todos' ? allRestaurants
    : activeFilter === 'Abertos agora' ? allRestaurants.filter(r => r.isOpen !== false)
    : activeFilter === 'Salvos' ? allRestaurants.filter(r => r.saved)
    : allRestaurants.filter(r => r.friendsLiked > 0);

  const filtered = query.trim() ? byFilter.filter(r => r.name.toLowerCase().includes(query.trim().toLowerCase())) : byFilter;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Floating controls above map */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <StatusBar/>
        <div style={{ display: 'flex', gap: 8, padding: '8px var(--space-page-margin, 16px) 10px', overflowX: 'auto', scrollbarWidth: 'none', background: 'rgba(244,239,230,0.95)', backdropFilter: 'blur(10px)' }}>
          {filters.map(f => (
            <Tag key={f} label={f} variant={activeFilter === f ? 'active' : 'default'} onClick={() => setActiveFilter(f)}/>
          ))}
        </div>
        <div style={{ padding: '0 var(--space-page-margin, 16px) 12px', background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.95)', border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-pill, 9999px)', padding: '10px 16px', boxShadow: '0 2px 12px rgba(5,6,21,0.1)', backdropFilter: 'blur(10px)' }}>
            <SearchIc s={18} col={SEC_TEXT}/>
            <input type="text" placeholder="Buscar no mapa..." value={query} onChange={e => setQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: INK, flex: 1 }}/>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <LeafletMap center={[-23.5505, -46.6633]} zoom={13} markers={filtered} onMarkerClick={r => setSelected(r)} style={{ height: '100%' }}/>
      </div>

      {/* Selected restaurant sheet */}
      {selected && (
        <BottomSheet onClose={() => setSelected(null)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK, marginBottom: 4, lineHeight: 1.3 }}>{selected.name}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT }}>{selected.address}</div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Fechar" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseIc s={18} col={SEC_TEXT}/>
              </button>
            </div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {selected.tags.map(t => <Tag key={t} label={t} variant="muted"/>)}
              <Tag label={`↑ ${selected.likes}`} variant="accent"/>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { go('restaurant', { restaurantId: selected.id }); setSelected(null); }}
                style={{ flex: 1, height: 48, background: INK, border: 'none', borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SURFACE }}>
                Ver restaurante
              </button>
              <button aria-label="Compartilhar" style={{ width: 48, height: 48, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShareIc s={18} col={SEC_TEXT}/>
              </button>
            </div>
          </div>
        </BottomSheet>
      )}

    </div>
  );
};

// ── ListsGridScreen ───────────────────────────────────────────────
const ListsGridScreen = ({ go, back, allLists }) => (
  <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column' }}>
    <StatusBar/>
    <div style={{ padding: '0 var(--space-page-margin, 16px) var(--space-4, 16px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER}`, height: 56, flexShrink: 0 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK }}>Suas listas</span>
      <button onClick={back} aria-label="Fechar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CloseIc s={20} col={SEC_TEXT}/>
      </button>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px var(--space-page-margin, 16px) 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px' }}>
        {allLists.map(list => (
          <ListCard key={list.id} list={list} onClick={() => go('list-open', { listId: list.id })}/>
        ))}
      </div>
      <div style={{ marginTop: 20, marginBottom: 24 }}>
        <button style={{ width: '100%', height: 54, border: `1px dashed ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PlusIc s={18} col={SEC_TEXT}/>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: SEC_TEXT }}>Criar nova lista</span>
        </button>
      </div>
      <div style={{ height: 60 }}/>
    </div>
  </div>
);

// ── ListOpenScreen ────────────────────────────────────────────────
const ListOpenScreen = ({ go, back, listId, allLists }) => {
  const list = allLists.find(l => l.id === listId) || allLists[0];
  const [following, setFollowing] = useState(false);
  const [friendsSheet, setFriendsSheet] = useState(null);
  const [addToListSheet, setAddToListSheet] = useState(null);
  const [followersSheet, setFollowersSheet] = useState(false);
  const followLongPressTimer = useRef(null);

  const startFollowLongPress = () => {
    followLongPressTimer.current = setTimeout(() => { followLongPressTimer.current = 'fired'; setFollowersSheet(true); }, 500);
  };
  const cancelFollowLongPress = () => {
    if (followLongPressTimer.current && followLongPressTimer.current !== 'fired') clearTimeout(followLongPressTimer.current);
    followLongPressTimer.current = null;
  };

  if (!list) return null;
  const friends = window.DATA.friends;

  const sheetTitle = { fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK, marginBottom: 4 };

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <NavHeader onBack={back} right={
        <button aria-label="Mais opções" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MoreIc s={20} col={SEC_TEXT}/>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Cover */}
        <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
          <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(5,6,21,0.5) 100%)' }}/>
        </div>

        {/* Title */}
        <div style={{ padding: '20px var(--space-6, 24px) 16px' }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-2xl, 32px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 6 }}>{list.title}</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 12 }}>Lista de {list.author}</div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag label={`${list.followers + (following ? 1 : 0)} seguidores`} variant="muted"/>
            {(() => {
              const mutuals = friends.slice(0, 3);
              if (!mutuals.length) return null;
              return (
                <div onPointerDown={startFollowLongPress} onPointerUp={cancelFollowLongPress} onPointerLeave={cancelFollowLongPress} onContextMenu={e => e.preventDefault()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: SURFACE_MUTED, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-pill, 9999px)', padding: '5px 10px 5px 8px', cursor: 'pointer', userSelect: 'none' }}>
                  {mutuals.map((f, i) => (
                    <img key={f.id} src={f.avatar} alt={f.name} style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${CREAM}`, marginLeft: i > 0 ? -8 : 0 }}/>
                  ))}
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>{mutuals.length === 1 ? 'segue' : 'seguem'}</span>
                </div>
              );
            })()}
            <button onClick={() => setFollowing(v => !v)}
              style={{ height: 28, padding: '0 var(--space-3, 12px)', borderRadius: 'var(--radius-pill, 9999px)', border: 'none', cursor: 'pointer', fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 500, background: following ? SURFACE_MUTED : INK, color: following ? INK : SURFACE, transition: `all var(--duration-fast, 150ms)` }}>
              {following ? '✓ Seguindo' : 'Seguir'}
            </button>
          </div>
        </div>

        {/* Restaurant list header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px var(--space-6, 24px) 14px' }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SEC_TEXT }}>Locais ({list.restaurants.length})</span>
          <button onClick={() => go('map')} aria-label="Ver no mapa" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapIc s={18} col={SEC_TEXT}/>
          </button>
        </div>

        {/* Cards */}
        <div style={{ padding: '0 var(--space-page-margin, 16px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.restaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r}
              onOpen={() => go('restaurant', { restaurantId: r.id })}
              onPlusClick={() => setAddToListSheet(r)}
              onLikesClick={type => setFriendsSheet({ type, restaurant: r })}/>
          ))}
        </div>
        <div style={{ height: 100 }}/>
      </div>

      {/* Friends liked sheet */}
      {friendsSheet && (
        <BottomSheet onClose={() => setFriendsSheet(null)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={sheetTitle}>{friendsSheet.type === 'up' ? 'Amigos que gostaram' : 'Amigos que não gostaram'}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 16 }}>{friendsSheet.restaurant.name}</div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {friends.slice(0, friendsSheet.type === 'up' ? friendsSheet.restaurant.friendsLiked : friendsSheet.restaurant.friendsDisliked).map(f => (
              <UserRow key={f.id} friend={f}/>
            ))}
          </div>
        </BottomSheet>
      )}

      {/* Add to list sheet */}
      {addToListSheet && (
        <BottomSheet onClose={() => setAddToListSheet(null)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={sheetTitle}>Adicionar à lista</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 20 }}>{addToListSheet.name}</div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {allLists.map(l => {
                const alreadyIn = l.restaurants.some(r => r.id === addToListSheet.id);
                return (
                  <div key={l.id} onClick={() => !alreadyIn && setAddToListSheet(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-3, 12px)', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={l.img} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK }}>{l.title}</div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>{l.restaurants.length} locais</div>
                    </div>
                    {alreadyIn
                      ? <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: COBALT }}>Adicionado</span>
                      : <PlusIc s={16} col={SEC_TEXT}/>}
                  </div>
                );
              })}
            </div>
            <button onClick={() => { setAddToListSheet(null); go('new-list'); }}
              style={{ width: '100%', height: 48, border: `1px dashed ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <PlusIc s={16} col={SEC_TEXT}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 500, color: SEC_TEXT }}>Criar nova lista</span>
            </button>
          </div>
        </BottomSheet>
      )}

      {/* Followers sheet */}
      {followersSheet && (
        <BottomSheet onClose={() => setFollowersSheet(false)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={sheetTitle}>Amigos que seguem</div>
              <button onClick={() => setFollowersSheet(false)} aria-label="Fechar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseIc s={20} col={SEC_TEXT}/>
              </button>
            </div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {friends.map(f => (
              <UserRow key={f.id} friend={f}/>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

// ── RestaurantScreen ──────────────────────────────────────────────
const RestaurantScreen = ({ go, back, restaurantId, allLists }) => {
  const allR = allLists.flatMap(l => l.restaurants.map(r => ({ ...r, listTitle: l.title })));
  const restaurant = allR.find(r => r.id === restaurantId) || allR[0];
  const inLists = allLists.filter(l => l.restaurants.some(r => r.id === restaurantId));
  const friends = window.DATA.friends;

  const [liked, setLiked] = useState(null);
  const [friendsSheet, setFriendsSheet] = useState(null);
  const [listSheet, setListSheet] = useState(false);
  const [addedToLists, setAddedToLists] = useState(() => new Set(allLists.filter(l => l.restaurants.some(r => r.id === restaurantId)).map(l => l.id)));
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const longPressTimer = useRef(null);
  const mapId = useRef(`rmap-${restaurantId}`);
  const mapR = useRef(null);

  const toggleList = (listId) => {
    setAddedToLists(prev => {
      const next = new Set(prev);
      const adding = !next.has(listId);
      adding ? next.add(listId) : next.delete(listId);
      if (adding) {
        const listName = allLists.find(l => l.id === listId)?.title;
        clearTimeout(toastTimer.current);
        setToast(listName);
        toastTimer.current = setTimeout(() => setToast(null), 2500);
      }
      return next;
    });
  };

  const startLongPress = (type) => {
    longPressTimer.current = setTimeout(() => { longPressTimer.current = 'fired'; setFriendsSheet(type); }, 500);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current && longPressTimer.current !== 'fired') clearTimeout(longPressTimer.current);
    longPressTimer.current = null;
  };
  const handleLikeClick = (type) => {
    if (longPressTimer.current === 'fired') { longPressTimer.current = null; return; }
    cancelLongPress();
    setLiked(v => v === type ? null : type);
  };

  if (!restaurant) return null;

  useEffect(() => {
    const el = document.getElementById(mapId.current);
    if (!el || mapR.current) return;
    const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    const map = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false })
      .setView([restaurant.lat, restaurant.lng], 15);
    mapR.current = map;
    L.tileLayer(tileUrl, { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    const icon = L.divIcon({ className: '', html: `<div style="width:36px;height:36px;background:${INK};border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 10px rgba(5,6,21,0.3);"><svg width='14' height='14' viewBox='0 0 24 24' fill='white'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/></svg></div>`, iconSize: [36, 36], iconAnchor: [18, 18] });
    L.marker([restaurant.lat, restaurant.lng], { icon }).addTo(map);
    return () => { if (mapR.current) { mapR.current.remove(); mapR.current = null; } };
  }, [restaurantId]);

  const sheetTitle = { fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK, marginBottom: 4 };

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar/>
      <NavHeader onBack={back} right={
        <button onClick={() => { if (navigator.share) navigator.share({ title: restaurant.name, url: window.location.href }); else { navigator.clipboard.writeText(window.location.href); setToast('Link copiado!'); toastTimer.current = setTimeout(() => setToast(null), 2500); } }}
          aria-label="Compartilhar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShareIc s={20} col={SEC_TEXT}/>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px var(--space-6, 24px) 14px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <button onClick={() => setListSheet(true)} aria-label="Salvar lugar"
              style={{ width: 36, height: 36, borderRadius: 'var(--radius-md, 8px)', background: INK, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <PlusIc s={15} col={SURFACE}/>
            </button>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-2xl, 32px)', fontWeight: 300, color: INK, lineHeight: 1.2, margin: 0, flex: 1 }}>{restaurant.name}</h1>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {restaurant.tags.map(t => <Tag key={t} label={t} variant="muted"/>)}
          </div>

          {/* Address */}
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 4 }}>{restaurant.address}</div>
          <span onClick={() => window.open('https://maps.google.com/?q=' + encodeURIComponent(restaurant.address), '_blank')}
            style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: COBALT, cursor: 'pointer' }}>
            Abrir no Google Maps
          </span>

          {/* Like/dislike */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
            {[
              { type: 'up',   count: restaurant.likes    + (liked === 'up'   ? 1 : 0), friendCount: restaurant.friendsLiked,    col: COBALT      },
              { type: 'down', count: restaurant.dislikes + (liked === 'down' ? 1 : 0), friendCount: restaurant.friendsDisliked, col: DESTRUCTIVE },
            ].map(({ type, count, friendCount, col }) => {
              const isActive = liked === type;
              const avatars = friends.slice(0, Math.min(friendCount, 3));
              return (
                <button key={type}
                  onPointerDown={() => startLongPress(type)} onPointerUp={() => handleLikeClick(type)}
                  onPointerLeave={cancelLongPress} onContextMenu={e => e.preventDefault()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 'var(--radius-pill, 9999px)', border: `1px solid ${isActive ? col : BORDER}`, cursor: 'pointer', background: isActive ? `${col}18` : SURFACE, transition: `all var(--duration-fast, 150ms)`, userSelect: 'none' }}>
                  {type === 'up' ? <ThumbUpIc s={15} col={isActive ? col : SEC_TEXT}/> : <ThumbDownIc s={15} col={isActive ? col : SEC_TEXT}/>}
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: isActive ? col : SEC_TEXT }}>{count}</span>
                  {friendCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {avatars.map((f, i) => (
                        <img key={f.id} src={f.avatar} alt={f.name} style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${SURFACE}`, marginLeft: i === 0 ? 2 : -5, zIndex: avatars.length - i, position: 'relative' }}/>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 200, position: 'relative', borderRadius: 'var(--radius-xl, 16px) var(--radius-xl, 16px) 0 0', overflow: 'hidden', border: `1px solid ${BORDER}`, margin: '0 var(--space-page-margin, 16px)' }}>
          <div id={mapId.current} style={{ width: '100%', height: '100%' }}/>
          <button onClick={() => go('map')}
            style={{ position: 'absolute', bottom: 12, right: 12, background: INK, border: 'none', borderRadius: 'var(--radius-pill, 9999px)', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 500 }}>
            <ListIc s={13} col={SURFACE}/>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: SURFACE }}>Ver no mapa</span>
          </button>
        </div>

        {/* Está nas listas */}
        {inLists.length > 0 && (
          <div style={{ padding: '20px var(--space-page-margin, 16px) 0' }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: INK, marginBottom: 12 }}>Está nas listas</div>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
              {inLists.map(l => <ListCard key={l.id} list={l} onClick={() => go('list-open', { listId: l.id })}/>)}
            </div>
          </div>
        )}
        <div style={{ height: 100 }}/>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'absolute', bottom: 90, left: 16, right: 16, zIndex: 600, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ background: INK, borderRadius: 'var(--radius-pill, 9999px)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(5,6,21,0.25)' }}>
            <AppLogomark color={SURFACE} size={14}/>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SURFACE, whiteSpace: 'nowrap' }}>{typeof toast === 'string' && toast.includes('copiado') ? toast : `Adicionado a ${toast}`}</span>
          </div>
        </div>
      )}

      {/* Add to list sheet */}
      {listSheet && (
        <BottomSheet onClose={() => setListSheet(false)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={sheetTitle}>Suas listas</div>
              <button onClick={() => setListSheet(false)} aria-label="Fechar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseIc s={20} col={SEC_TEXT}/>
              </button>
            </div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {allLists.map(l => {
                const isAdded = addedToLists.has(l.id);
                return (
                  <div key={l.id} onClick={() => isAdded ? (setListSheet(false), go('list-open', { listId: l.id })) : toggleList(l.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-3, 12px)', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md, 8px)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={l.img} alt={l.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK }}>{l.title}</div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>{l.restaurants.length} locais</div>
                    </div>
                    {isAdded
                      ? <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: COBALT }}>Adicionado</span>
                      : <PlusIc s={16} col={SEC_TEXT}/>}
                  </div>
                );
              })}
            </div>
            <button onClick={() => { setListSheet(false); go('new-list'); }}
              style={{ width: '100%', height: 48, border: `1px dashed ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <PlusIc s={16} col={SEC_TEXT}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 500, color: SEC_TEXT }}>Criar nova lista</span>
            </button>
          </div>
        </BottomSheet>
      )}

      {/* Who liked/disliked sheet */}
      {friendsSheet && (
        <BottomSheet onClose={() => setFriendsSheet(null)}>
          <div style={{ padding: '16px var(--space-4, 16px) 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={sheetTitle}>{friendsSheet === 'up' ? 'Quem gostou' : 'Quem não gostou'}</div>
              <button onClick={() => setFriendsSheet(null)} aria-label="Fechar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseIc s={20} col={SEC_TEXT}/>
              </button>
            </div>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 var(--space-4, 16px) var(--space-6, 24px)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {friends.slice(0, friendsSheet === 'up' ? restaurant.friendsLiked : restaurant.friendsDisliked).map(f => (
              <UserRow key={f.id} friend={f}/>
            ))}
            {(friendsSheet === 'up' ? restaurant.friendsLiked : restaurant.friendsDisliked) === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0', fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: SEC_TEXT }}>Nenhum amigo ainda</div>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

// ── ProfileScreen ─────────────────────────────────────────────────
const ProfileScreen = ({ go, back, allLists }) => {
  const user = window.DATA.user;
  const [tab, setTab] = useState('listas');
  const [shareToast, setShareToast] = useState(false);
  const myLists = allLists.filter(l => user.myListIds.includes(l.id));

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <NavHeader onBack={back} right={
        <button onClick={() => { if (navigator.share) navigator.share({ title: user.name, url: window.location.href }); else { navigator.clipboard.writeText(window.location.href); setShareToast(true); setTimeout(() => setShareToast(false), 2500); } }}
          aria-label="Compartilhar" style={{ border: 'none', background: 'none', cursor: 'pointer', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShareIc s={20} col={SEC_TEXT}/>
        </button>
      }/>

      {shareToast && (
        <div style={{ position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)', background: INK, borderRadius: 'var(--radius-pill, 9999px)', padding: '10px 20px', zIndex: 600, whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SURFACE }}>Link copiado.</span>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile header */}
        <div style={{ padding: '20px var(--space-6, 24px) 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <img src={user.avatar} alt={user.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${BORDER}` }}/>
              <button aria-label="Alterar foto" style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: SURFACE_MUTED, border: `2px solid ${CREAM}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CameraIc s={13} col={SEC_TEXT}/>
              </button>
            </div>
            <button style={{ height: 36, padding: '0 var(--space-4, 16px)', background: 'transparent', border: `1px solid ${INK}`, borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: INK }}>
              Editar perfil
            </button>
          </div>

          <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-md, 17px)', fontWeight: 600, color: INK, marginBottom: 4 }}>{user.name}</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 16 }}>{user.handle}</div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Tag label={`${user.followers} seguidores`} variant="muted"/>
            <Tag label={`${user.following} seguindo`} variant="muted"/>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${BORDER}`, padding: '0 var(--space-page-margin, 16px)' }}>
          {['listas', 'pins', 'locais'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, height: 44, border: 'none', background: 'none', cursor: 'pointer', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: tab === t ? INK : SEC_TEXT, borderBottom: tab === t ? `2px solid ${INK}` : '2px solid transparent', marginBottom: -1, transition: `all var(--duration-fast, 150ms)`, textTransform: 'capitalize' }}>
              {t === 'listas' ? 'Listas' : t === 'pins' ? 'Pins' : 'Locais'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '20px var(--space-page-margin, 16px) 0' }}>
          {tab === 'listas' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px' }}>
              {myLists.map(l => (
                <ListCard key={l.id} list={l} onClick={() => go('list-open', { listId: l.id })}/>
              ))}
              <div style={{ width: 158, cursor: 'pointer' }}>
                <div style={{ width: 158, height: 158, borderRadius: 'var(--radius-md, 8px)', border: `1px dashed ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <PlusIc s={20} col={SEC_TEXT}/>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>Nova lista</span>
                </div>
              </div>
            </div>
          )}
          {tab === 'pins' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <HeartIc s={40} col={`${SEC_TEXT}50`}/>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: SEC_TEXT, marginTop: 16, lineHeight: 1.4 }}>Nenhum pin ainda</div>
            </div>
          )}
          {tab === 'locais' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <MapIc s={40} col={`${SEC_TEXT}50`}/>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: SEC_TEXT, marginTop: 16, lineHeight: 1.4 }}>Nenhum local visitado</div>
            </div>
          )}
        </div>
        <div style={{ height: 100 }}/>
      </div>
    </div>
  );
};

Object.assign(window, { MapScreen, ListsGridScreen, ListOpenScreen, RestaurantScreen, ProfileScreen });
