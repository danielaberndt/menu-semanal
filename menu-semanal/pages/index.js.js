import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Download, Search, X, Clock } from 'lucide-react';

export default function MenuApp() {
  const [view, setView] = useState('menu');
  const [weekMenu, setWeekMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [recipeBank, setRecipeBank] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ type: 'shopping', frequency: 'daily', day: 'friday', time: '18:00', customText: '' });

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  const defaultRecipeBank = [
    // Fideos - 20
    { id: 1, name: 'Fideos con carne', ingredients: ['Fideos (500g)', 'Carne molida (400g)', 'Cebolla', 'Ajo', 'Tomate'] },
    { id: 2, name: 'Fideos con atún', ingredients: ['Fideos (500g)', 'Atún enlatado', 'Cebolla', 'Ajo', 'Salsa tomate'] },
    { id: 3, name: 'Lasaña Ñoquis', ingredients: ['Ñoquis (500g)', 'Carne', 'Salsa blanca', 'Queso'] },
    { id: 4, name: 'Fideos con verduras', ingredients: ['Fideos (500g)', 'Zanahoria', 'Brócoli', 'Champiñones', 'Aceite'] },
    { id: 5, name: 'Fideos con mariscos', ingredients: ['Fideos (500g)', 'Camarones', 'Almejas', 'Ajo', 'Vino blanco'] },
    { id: 6, name: 'Lasaña de pollo', ingredients: ['Placas lasaña', 'Pollo', 'Salsa blanca', 'Queso'] },
    { id: 7, name: 'Ravioles o canelones', ingredients: ['Ravioles (500g)', 'Carne o queso', 'Salsa tomate', 'Queso parmesano'] },
    { id: 8, name: 'Fideos con pollo y espinaca', ingredients: ['Fideos (500g)', 'Pechuga', 'Espinaca', 'Crema', 'Ajo'] },
    { id: 9, name: 'Tallarines con salsa roja', ingredients: ['Tallarines (500g)', 'Salsa tomate', 'Ajo', 'Cebolla', 'Orégano'] },
    { id: 10, name: 'Tallarines Alfredo', ingredients: ['Tallarines (500g)', 'Crema', 'Queso parmesano', 'Mantequilla', 'Ajo'] },
    { id: 11, name: 'Espaguetis a la boloñesa', ingredients: ['Espagueti (500g)', 'Carne molida', 'Tomate', 'Cebolla', 'Ajo'] },
    { id: 12, name: 'Macarrones con queso', ingredients: ['Macarrones (500g)', 'Queso cheddar', 'Leche', 'Mantequilla', 'Harina'] },
    { id: 13, name: 'Penne al pesto', ingredients: ['Penne (500g)', 'Albahaca', 'Piñones', 'Queso parmesano', 'Aceite'] },
    { id: 14, name: 'Fideos salteados con vegetales', ingredients: ['Fideos cocidos', 'Zanahoria', 'Brócoli', 'Cebolla', 'Salsa soya'] },
    { id: 15, name: 'Yakisoba de pollo', ingredients: ['Fideos yakisoba', 'Pollo', 'Repollo', 'Zanahoria', 'Salsa yakisoba'] },
    { id: 16, name: 'Fideos con salsa de champiñones', ingredients: ['Fideos (500g)', 'Champiñones', 'Crema', 'Ajo', 'Vino blanco'] },
    { id: 17, name: 'Fideos con salsa blanca y jamón', ingredients: ['Fideos (500g)', 'Jamón cocido', 'Salsa blanca', 'Queso', 'Crema'] },
    { id: 18, name: 'Pasta primavera', ingredients: ['Pasta (500g)', 'Champiñones', 'Espárrago', 'Tomate cherry', 'Aceite'] },
    { id: 19, name: 'Fusilli con tomate y albahaca', ingredients: ['Fusilli (500g)', 'Tomate fresco', 'Albahaca', 'Ajo', 'Aceite'] },
    { id: 20, name: 'Fideos al horno con queso', ingredients: ['Fideos (500g)', 'Salsa tomate', 'Queso', 'Crema', 'Huevo'] },
    
    // Verduras - 10
    { id: 21, name: 'Tortilla de zanahoria', ingredients: ['Zanahoria', 'Huevo', 'Cebolla', 'Queso', 'Aceite'] },
    { id: 22, name: 'Tortilla de papas', ingredients: ['Papa', 'Huevo', 'Cebolla', 'Aceite', 'Sal'] },
    { id: 23, name: 'Salteado de verduras', ingredients: ['Brócoli', 'Zanahoria', 'Champiñones', 'Cebolla', 'Ajo'] },
    { id: 24, name: 'Tacos de verduras', ingredients: ['Tortillas', 'Vegetales surtidos', 'Lechuga', 'Tomate', 'Crema'] },
    { id: 25, name: 'Zapallo italiano relleno', ingredients: ['Zapallo italiano', 'Carne molida', 'Cebolla', 'Tomate', 'Queso'] },
    { id: 26, name: 'Pastelera de choclo', ingredients: ['Choclo molido', 'Carne', 'Cebolla', 'Aceituna', 'Huevo'] },
    { id: 27, name: 'Gratín de brócoli', ingredients: ['Brócoli', 'Salsa blanca', 'Queso', 'Mantequilla', 'Pan rallado'] },
    { id: 28, name: 'Berenjenas al horno', ingredients: ['Berenjena', 'Tomate', 'Ajo', 'Queso', 'Aceite'] },
    { id: 29, name: 'Pimientos rellenos', ingredients: ['Pimiento', 'Carne molida', 'Cebolla', 'Arroz', 'Tomate'] },
    { id: 30, name: 'Ratatouille', ingredients: ['Berenjena', 'Calabaza', 'Pimiento', 'Tomate', 'Ajo'] },
    
    // Pollo - 10
    { id: 31, name: 'Pollo al horno', ingredients: ['Pollo entero', 'Limón', 'Ajo', 'Papas', 'Aceite'] },
    { id: 32, name: 'Pollo arvejado', ingredients: ['Pollo', 'Arveja', 'Cebolla', 'Ajo', 'Papas'] },
    { id: 33, name: 'Pechuga salteada', ingredients: ['Pechuga', 'Aceite', 'Ajo', 'Limón', 'Perejil'] },
    { id: 34, name: 'Cazuela de pollo', ingredients: ['Pollo', 'Papa', 'Maíz', 'Cebolla', 'Caldo'] },
    { id: 35, name: 'Hamburguesas de pollo', ingredients: ['Pechuga molida', 'Huevo', 'Pan rallado', 'Cebolla', 'Ajo'] },
    { id: 36, name: 'Pollo teriyaki', ingredients: ['Pollo', 'Salsa teriyaki', 'Ajo', 'Cebolla', 'Sesame'] },
    { id: 37, name: 'Pollo al curry', ingredients: ['Pollo', 'Curry', 'Coco', 'Cebolla', 'Caldo'] },
    { id: 38, name: 'Fajitas de pollo', ingredients: ['Pechuga', 'Pimiento', 'Cebolla', 'Tortillas', 'Crema'] },
    { id: 39, name: 'Pollo con miel y mostaza', ingredients: ['Pollo', 'Miel', 'Mostaza', 'Limón', 'Ajo'] },
    { id: 40, name: 'Pollo con champiñones', ingredients: ['Pollo', 'Champiñones', 'Crema', 'Vino blanco', 'Cebolla'] },
    
    // Carne - 10
    { id: 41, name: 'Bistec a la parrilla', ingredients: ['Bistec', 'Sal', 'Pimienta', 'Limón', 'Ajo'] },
    { id: 42, name: 'Carne mongoliana', ingredients: ['Carne molida', 'Cebolla', 'Ajo', 'Salsa soya', 'Jengibre'] },
    { id: 43, name: 'Carne a la olla', ingredients: ['Carne trozos', 'Papa', 'Zanahoria', 'Cebolla', 'Caldo'] },
    { id: 44, name: 'Carne al horno', ingredients: ['Carne', 'Papas', 'Cebolla', 'Ajo', 'Hierbas'] },
    { id: 45, name: 'Albóndigas con arroz', ingredients: ['Carne molida', 'Arroz', 'Huevo', 'Cebolla', 'Salsa tomate'] },
    { id: 46, name: 'Hamburguesa casera', ingredients: ['Carne molida', 'Huevo', 'Pan rallado', 'Cebolla', 'Ajo'] },
    { id: 47, name: 'Pastel de papa', ingredients: ['Carne molida', 'Puré papas', 'Cebolla', 'Huevo', 'Queso'] },
    { id: 48, name: 'Estofado de carne', ingredients: ['Carne trozos', 'Papa', 'Zanahoria', 'Cebolla', 'Vino tinto'] },
    { id: 49, name: 'Lomo saltado', ingredients: ['Lomo', 'Papa', 'Tomate', 'Cebolla', 'Ajo'] },
    { id: 50, name: 'Arrollado de carne', ingredients: ['Carne para arrollar', 'Huevo duro', 'Zanahoria', 'Cebolla', 'Hierbas'] },
    
    // Pescado y Mariscos - 10
    { id: 51, name: 'Salmón salteado', ingredients: ['Filete salmón', 'Aceite', 'Limón', 'Ajo', 'Hierbas'] },
    { id: 52, name: 'Salmón al horno', ingredients: ['Salmón', 'Papas', 'Limón', 'Ajo', 'Hierbas'] },
    { id: 53, name: 'Congrio frito', ingredients: ['Congrio', 'Harina', 'Aceite', 'Limón', 'Sal'] },
    { id: 54, name: 'Merluza frita', ingredients: ['Merluza', 'Harina', 'Huevo', 'Aceite', 'Limón'] },
    { id: 55, name: 'Mariscos con arroz', ingredients: ['Camarones', 'Almejas', 'Arroz', 'Cebolla', 'Caldo'] },
    { id: 56, name: 'Risotto de camarones', ingredients: ['Arroz arborio', 'Camarones', 'Caldo', 'Vino blanco', 'Queso'] },
    { id: 57, name: 'Croquetas de atún', ingredients: ['Atún', 'Papa', 'Huevo', 'Pan rallado', 'Aceite'] },
    { id: 58, name: 'Caldillo de mariscos', ingredients: ['Camarones', 'Almejas', 'Papas', 'Caldo', 'Tomate'] },
    { id: 59, name: 'Paella de mariscos', ingredients: ['Arroz', 'Camarones', 'Almejas', 'Caldo', 'Azafrán'] },
    { id: 60, name: 'Camarones al ajillo', ingredients: ['Camarones', 'Ajo', 'Aceite', 'Limón', 'Perejil'] },
  ];

  useEffect(() => {
    const bank = defaultRecipeBank;
    setRecipeBank(bank);
    setReminders([]);
    generateNewMenuFromBank(bank);
  }, []);

  useEffect(() => {
    if (recipeBank) localStorage.setItem('menuAppBank', JSON.stringify(recipeBank));
  }, [recipeBank]);

  useEffect(() => {
    if (weekMenu) localStorage.setItem('menuAppMenu', JSON.stringify(weekMenu));
  }, [weekMenu]);

  useEffect(() => {
    localStorage.setItem('menuAppReminders', JSON.stringify(reminders));
  }, [reminders]);

  const generateNewMenuFromBank = (bank) => {
    if (!bank || bank.length < 6) return;
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    const newMenu = days.reduce((acc, day, idx) => {
      acc[day] = shuffled[idx];
      return acc;
    }, {});
    setWeekMenu(newMenu);
  };

  const generateNewMenu = () => {
    generateNewMenuFromBank(recipeBank);
  };

  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearchRecipes = async () => {
    if (!searchQuery.trim()) return;
    setLoadingSearch(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Busca 5 recetas de almuerzo que contengan "${searchQuery}". Responde SOLO con un JSON válido (sin texto adicional):
              {
                "recipes": [
                  {"name": "nombre de la receta", "ingredients": ["ingrediente1", "ingrediente2", "ingrediente3", "ingrediente4", "ingrediente5"]},
                  ...
                ]
              }`
            }
          ]
        })
      });

      const data = await response.json();
      const content = data.content[0].text;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const resultsWithIds = parsed.recipes.map((recipe, idx) => ({
          ...recipe,
          id: Date.now() + idx
        }));
        setSearchResults(resultsWithIds);
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setSearchResults([]);
    }
    setLoadingSearch(false);
  };

  const addRecipeToBank = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() };
    setRecipeBank([...recipeBank, newRecipe]);
    setSearchResults(searchResults.filter(r => r !== recipe));
  };

  const replaceMenuRecipe = (day, recipe) => {
    setWeekMenu({ ...weekMenu, [day]: recipe });
    setSelectedDay(null);
  };

  const updateMenuRecipe = (day, updates) => {
    const updated = { ...weekMenu[day], ...updates };
    setWeekMenu({ ...weekMenu, [day]: updated });
  };

  const downloadMenu = () => {
    let text = 'MENÚ SEMANAL\n\n';
    days.forEach(day => {
      if (weekMenu[day]) text += `${day}: ${weekMenu[day].name}\n`;
    });
    text += '\n\nINGREDIENTES TOTALES:\n';
    const allIngredients = new Set();
    days.forEach(day => {
      if (weekMenu[day]) {
        weekMenu[day].ingredients.forEach(ing => allIngredients.add(ing));
      }
    });
    allIngredients.forEach(ing => text += `- ${ing}\n`);

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menu-semanal.txt';
    a.click();
  };

  const addReminder = () => {
    const reminder = { ...newReminder, id: Date.now() };
    setReminders([...reminders, reminder]);
    setNewReminder({ type: 'shopping', frequency: 'daily', day: 'friday', time: '18:00', customText: '' });
    setShowReminderForm(false);
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  if (!weekMenu || !recipeBank) return <div style={{padding: '2rem', textAlign: 'center', fontFamily: 'Georgia', color: '#5a4a42'}}>Cargando menú...</div>;

  const dayLabels = { 'monday': 'Lunes', 'tuesday': 'Martes', 'wednesday': 'Miércoles', 'thursday': 'Jueves', 'friday': 'Viernes', 'saturday': 'Sábado', 'sunday': 'Domingo' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fef9f3 0%, #fdf3e8 100%)', fontFamily: 'Georgia, serif', color: '#5a4a42' }}>
      <header style={{ background: 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#fff', textAlign: 'center' }}>Menú Semanal</h1>
        <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>Tus recetas favoritas</p>
      </header>

      <nav style={{ background: '#fff', borderBottom: '1px solid #e8c4a0', padding: '0.8rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['menu', 'bank', 'search', 'reminders'].map(v => (
          <button key={v} onClick={() => { setView(v); setSelectedDay(null); }} style={{ padding: '0.5rem 1rem', background: view === v ? '#d4a574' : 'transparent', color: view === v ? '#fff' : '#8b7355', border: 'none', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Georgia' }}>
            {v === 'menu' ? 'Menú' : v === 'bank' ? 'Banco' : v === 'search' ? 'Buscar' : 'Recordatorios'}
          </button>
        ))}
      </nav>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
        {view === 'menu' && !selectedDay && (
          <div>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              <button onClick={generateNewMenu} style={{ padding: '0.6rem 1rem', background: '#e8c4a0', color: '#5a4a42', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Georgia' }}>
                <RotateCcw size={14} style={{display: 'inline', marginRight: '0.3rem'}} /> Generar nuevo
              </button>
              <button onClick={downloadMenu} style={{ padding: '0.6rem 1rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Georgia' }}>
                <Download size={14} style={{display: 'inline', marginRight: '0.3rem'}} /> Descargar
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
              {days.map(day => (
                <div key={day} onClick={() => setSelectedDay(day)} style={{ background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#d4a574' }}>{day}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#5a4a42', fontWeight: '500' }}>{weekMenu[day]?.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'menu' && selectedDay && !selectedDay.includes('-replace') && (
          <div style={{ background: '#fff', borderRadius: '8px', padding: '1.2rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setSelectedDay(null)} style={{ marginBottom: '0.8rem', padding: '0.4rem 0.8rem', background: '#f0e8dc', color: '#5a4a42', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Georgia' }}>← Volver</button>
            <h2 style={{ margin: '0 0 0.8rem 0', fontSize: '1.2rem', color: '#d4a574' }}>{selectedDay}</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', color: '#8b7355' }}>Nombre del plato</label>
              <input type="text" value={weekMenu[selectedDay]?.name || ''} onChange={(e) => updateMenuRecipe(selectedDay, { name: e.target.value })} style={{ width: '100%', padding: '0.5rem', border: '1px solid #d4a574', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.8rem', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', color: '#8b7355' }}>Ingredientes</label>
              {weekMenu[selectedDay]?.ingredients.map((ing, idx) => (
                <input key={idx} type="text" value={ing} onChange={(e) => { const newIng = [...weekMenu[selectedDay].ingredients]; newIng[idx] = e.target.value; updateMenuRecipe(selectedDay, { ingredients: newIng }); }} style={{ width: '100%', padding: '0.4rem', border: '1px solid #e8c4a0', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem', marginBottom: '0.3rem', boxSizing: 'border-box' }} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button onClick={() => setSelectedDay(null)} style={{ padding: '0.5rem 0.8rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia', fontSize: '0.75rem' }}>Guardar</button>
              <button onClick={() => setSelectedDay(selectedDay + '-replace')} style={{ padding: '0.5rem 0.8rem', background: '#f0e8dc', color: '#5a4a42', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia', fontSize: '0.75rem' }}>Cambiar receta</button>
            </div>
          </div>
        )}

        {view === 'menu' && selectedDay && selectedDay.includes('-replace') && (
          <div style={{ background: '#fff', borderRadius: '8px', padding: '1.2rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setSelectedDay(selectedDay.replace('-replace', ''))} style={{ marginBottom: '0.8rem', padding: '0.4rem 0.8rem', background: '#f0e8dc', color: '#5a4a42', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Georgia' }}>← Volver</button>
            <h3 style={{ marginTop: 0, color: '#d4a574', fontSize: '0.95rem' }}>Selecciona receta para {selectedDay.replace('-replace', '')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
              {recipeBank.map(recipe => (
                <div key={recipe.id} onClick={() => replaceMenuRecipe(selectedDay.replace('-replace', ''), recipe)} style={{ background: '#fef9f3', border: '1px solid #d4a574', borderRadius: '6px', padding: '0.8rem', cursor: 'pointer' }}>
                  <p style={{ margin: '0 0 0.3rem 0', fontWeight: '500', color: '#5a4a42', fontSize: '0.8rem' }}>{recipe.name}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#8b7355' }}>{recipe.ingredients.length} ingredientes</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'bank' && (
          <div>
            <h2 style={{ color: '#d4a574', marginTop: 0, fontSize: '1.1rem' }}>Banco ({recipeBank.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
              {recipeBank.map(recipe => (
                <div key={recipe.id} style={{ background: '#fff', borderRadius: '8px', padding: '0.8rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: '#d4a574', fontSize: '0.8rem' }}>{recipe.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#8b7355' }}>{recipe.ingredients.length} ingredientes</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'search' && (
          <div>
            <h2 style={{ color: '#d4a574', marginTop: 0, fontSize: '1.1rem' }}>Buscar Recetas</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="text" placeholder="Ej: pollo..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearchRecipes()} style={{ flex: 1, padding: '0.5rem', border: '1px solid #d4a574', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }} />
              <button onClick={handleSearchRecipes} disabled={loadingSearch} style={{ padding: '0.5rem 0.8rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '4px', cursor: loadingSearch ? 'not-allowed' : 'pointer', fontFamily: 'Georgia', fontSize: '0.7rem', opacity: loadingSearch ? 0.6 : 1 }}>
                {loadingSearch ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            {searchResults.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
                {searchResults.map(recipe => (
                  <div key={recipe.id} style={{ background: '#fff', borderRadius: '8px', padding: '0.8rem' }}>
                    <h4 style={{ margin: '0 0 0.4rem 0', color: '#d4a574', fontSize: '0.8rem' }}>{recipe.name}</h4>
                    <button onClick={() => addRecipeToBank(recipe)} style={{ padding: '0.4rem 0.6rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'Georgia' }}>Agregar</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'reminders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ color: '#d4a574', margin: 0, fontSize: '1.1rem' }}>Recordatorios</h2>
              <button onClick={() => setShowReminderForm(!showReminderForm)} style={{ padding: '0.5rem 0.8rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia', fontSize: '0.7rem' }}>
                <Plus size={12} style={{display: 'inline'}} /> Nuevo
              </button>
            </div>

            {showReminderForm && (
              <div style={{ background: '#fff', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <select value={newReminder.type} onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value, customText: '' })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }}>
                  <option value="shopping">Compra ingredientes</option>
                  <option value="thaw">Descongelar</option>
                  <option value="custom">Personalizado</option>
                </select>

                {newReminder.type === 'custom' && (
                  <input type="text" placeholder="Escribe tu recordatorio..." value={newReminder.customText} onChange={(e) => setNewReminder({ ...newReminder, customText: e.target.value })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }} />
                )}
                
                <select value={newReminder.frequency} onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }}>
                  <option value="daily">Todos los días</option>
                  <option value="weekly">Día específico</option>
                </select>

                {newReminder.frequency === 'weekly' && (
                  <select value={newReminder.day} onChange={(e) => setNewReminder({ ...newReminder, day: e.target.value })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }}>
                    {Object.entries(dayLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                )}
                
                <input type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.8rem', borderRadius: '4px', fontFamily: 'Georgia', fontSize: '0.75rem' }} />
                <button onClick={addReminder} style={{ padding: '0.4rem 0.6rem', background: '#d4a574', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia', fontSize: '0.7rem', marginRight: '0.4rem' }}>Guardar</button>
                <button onClick={() => setShowReminderForm(false)} style={{ padding: '0.4rem 0.6rem', background: '#f0e8dc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Georgia', fontSize: '0.7rem' }}>Cancelar</button>
              </div>
            )}

            <div style={{ display: 'grid', gap: '0.6rem' }}>
              {reminders.length === 0 ? (
                <p style={{ color: '#8b7355', textAlign: 'center', padding: '1rem', fontSize: '0.75rem' }}>Sin recordatorios</p>
              ) : (
                reminders.map(reminder => (
                  <div key={reminder.id} style={{ background: '#fff', borderRadius: '8px', padding: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.75rem' }}>
                      <p style={{ margin: '0 0 0.2rem 0', fontWeight: '500', color: '#5a4a42' }}>
                        {reminder.type === 'shopping' ? 'Comprar' : reminder.type === 'thaw' ? 'Descongelar' : reminder.customText}
                      </p>
                      <p style={{ margin: 0, color: '#8b7355' }}>
                        {reminder.frequency === 'daily' ? 'Todos los días' : dayLabels[reminder.day]} a las {reminder.time}
                      </p>
                    </div>
                    <button onClick={() => removeReminder(reminder.id)} style={{ padding: '0.3rem', background: '#f0e8dc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
