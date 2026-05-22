const heroTrack = document.getElementById("heroTrack");
const heroSlides = Array.from(heroTrack.children);
let heroIndex = 0;
let heroTimer = null;
let detailMapInstance = null;

const detailOverlay = document.getElementById("detailOverlay");
const detailPanel = document.getElementById("detailPanel");
const detailClose = document.getElementById("detailClose");
const detailTitle = document.getElementById("detailTitle");
const detailKicker = document.getElementById("detailKicker");
const detailShort = document.getElementById("detailShort");
const detailLong = document.getElementById("detailLong");
const detailAddress = document.getElementById("detailAddress");
const detailMapsLink = document.getElementById("detailMapsLink");
const menuDestinos = document.getElementById("menuDestinos");
const menuGastronomia = document.getElementById("menuGastronomia");
const menuCultura = document.getElementById("menuCultura");
const destinosOverlay = document.getElementById("destinosOverlay");
const destinosPanel = document.getElementById("destinosPanel");
const destinosClose = document.getElementById("destinosClose");
const destinosTabs = document.getElementById("destinosTabs");
const destinosGrid = document.getElementById("destinosGrid");
const destinosTitle = document.getElementById("destinosTitle");
const destinosKicker = document.querySelector(".destinos-kicker");
const destinoDetailOverlay = document.getElementById("destinoDetailOverlay");
const destinoDetailCard = document.getElementById("destinoDetailCard");
const destinoDetailClose = document.getElementById("destinoDetailClose");
const destinoDetailImage = document.getElementById("destinoDetailImage");
const destinoDetailTitle = document.getElementById("destinoDetailTitle");
const destinoDetailDescription = document.getElementById("destinoDetailDescription");
const destinoDetailAddress = document.getElementById("destinoDetailAddress");
const destinoDetailMapsLink = document.getElementById("destinoDetailMapsLink");
const destinoDetailAddressBox = document.querySelector(".destino-detail-address");
const destinoDetailMapWrap = document.querySelector(".destino-detail-map-wrap");
const langSwitcher = document.getElementById("langSwitcher");
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langCurrentFlag = document.getElementById("langCurrentFlag");
const langCurrentLabel = document.getElementById("langCurrentLabel");

let destinoDetailMapInstance = null;
let activeDestinosTab = "folcloricas";
let activeOverlayMode = "destinos";
let currentLanguage = "es";
let activeDetailSectionKey = null;

const destinosData = {
  folcloricas: [
    {
      title: "Piscilago",
      image: "img/Destinos/piscilago.jpg",
      shortLabel: "Parque acuático y conservación",
      longDescription:
        "Piscilago es ideal para un plan familiar completo: combina atracciones acuáticas, zonas de descanso y experiencias de educación ambiental. Su propuesta une diversión y conservación, con recorridos de biodiversidad que lo convierten en uno de los destinos recreativos más reconocidos del país.",
      address:
        "Kilómetro 105 de la vía Bogotá-Girardot, a cinco minutos de Melgar (Tolima), Colombia.",
      lat: 4.223366181173269,
      lng: -74.69062835880113,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.223366181173269,-74.69062835880113",
    },
    {
      title: "Cerro de la Cruz",
      image: "img/Destinos/cerro_cruz.jpg",
      shortLabel: "Caminata y mirador natural",
      longDescription:
        "El Cerro de la Cruz es una caminata apreciada por quienes buscan una vista panorámica de Girardot y de las montañas cercanas. El recorrido atraviesa senderos con inclinación moderada y zonas naturales que lo convierten en una opción llamativa para quienes disfrutan del paisaje y la fotografía. Se recomienda usar calzado cómodo, llevar agua y hacer el trayecto con precaución, especialmente en días soleados.",
      address: "Girardot, Cundinamarca, sector del Cerro de la Cruz.",
      lat: 4.359713902040148,
      lng: -74.67244181302841,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.359713902040148,-74.67244181302841",
    },
    {
      title: "Isla del Sol",
      image: "img/Destinos/isla_sol.jpg",
      shortLabel: "Descanso en clima cálido",
      longDescription:
        "La Isla del Sol es una opción asociada a paseos tranquilos y planes para compartir en pareja, con amigos o en familia. El entorno natural, el clima cálido y la cercanía con recorridos fluviales hacen que sea un punto atractivo para quienes desean una experiencia más relajada cerca de Girardot. Es un lugar apropiado para desconectarse, apreciar el paisaje y complementar una visita por la zona ribereña.",
      address: "Zona turística de la Isla del Sol, Girardot, Cundinamarca.",
      lat: 4.28943291007592,
      lng: -74.79043473936906,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.28943291007592,-74.79043473936906",
    },
    {
      title: "Embarcadero Turístico",
      image: "img/Destinos/embarcadero.jpg",
      shortLabel: "Paseos por el río Magdalena",
      longDescription:
        "Desde el Embarcadero Turístico parten recorridos fluviales en diferentes embarcaciones, una experiencia ideal para conocer Girardot desde el río Magdalena. Es un plan muy atractivo para quienes desean vivir la ciudad desde su tradición ribereña.",
      address:
        "Embarcadero Turístico de Girardot, zona ribereña del río Magdalena, Girardot, Cundinamarca.",
      lat: 4.29376782727821,
      lng: -74.8105110708882,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.29376782727821,-74.8105110708882",
    },
  ],
  urbanas: [
    {
      title: "Puente Férreo",
      image: "img/Destinos/puente_ferreo.jpg",
      shortLabel: "Patrimonio y mirador histórico",
      longDescription:
        "El Puente Férreo es uno de los íconos más representativos de Girardot. Su historia está ligada a la antigua conexión ferroviaria con Tolima y Huila, y hoy es un punto peatonal con gran valor patrimonial, ideal para fotografía y recorridos urbanos.",
      address: "Puente Férreo de Girardot, sector del río Magdalena, Girardot, Cundinamarca.",
      lat: 4.293934519978105,
      lng: -74.81114185767194,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.293934519978105,-74.81114185767194",
    },
    {
      title: "Parque de la Locomotora",
      image: "img/Destinos/parque_locomotora.jpg",
      shortLabel: "Memoria ferroviaria",
      longDescription:
        "El Parque de la Locomotora conserva la memoria de la antigua estación de tren y de la infraestructura ferroviaria que marcó el desarrollo local. Es un lugar emblemático para conocer la historia de la ciudad en un recorrido corto y muy fotogénico.",
      address: "Cl. 16 #14-33, Girardot, Cundinamarca.",
      lat: 4.297159593284818,
      lng: -74.8090458,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.297159593284818,-74.8090458",
    },
    {
      title: "Parroquia San Miguel",
      image: "img/Destinos/parroquia_san_miguel.jpg",
      shortLabel: "Patrimonio religioso",
      longDescription:
        "La Parroquia San Miguel es un referente espiritual y urbano en Girardot. Su presencia en el barrio San Miguel la convierte en una parada cultural para quienes desean conocer espacios tradicionales de la ciudad.",
      address: "Calle 12 No. 9-18, barrio San Miguel, Girardot, Cundinamarca.",
      lat: 4.292811522868402,
      lng: -74.80750775582015,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.292811522868402,-74.80750775582015",
    },
  ],
};

const gastronomiaData = {
  restaurantes: [
    {
      title: "El Cielo - Gastrobar & Discoteca",
      image: "img/Gastronomia/el_cielo.jpg",
      shortLabel: "Gastronomía y noche en un solo lugar",
      longDescription:
        "El Cielo - Gastrobar & Discoteca combina restaurante, mirador y ambiente nocturno en un mismo espacio. Es una opción llamativa para quienes desean cenar, compartir con amigos y luego continuar la noche en un lugar con música y vista de la ciudad. Según promociones públicas, algunos eventos y planes especiales han manejado valores aproximados desde $20.000 COP en almuerzos promocionales y entradas cercanas a $30.000 COP en noches temáticas, sujetos a cambios.",
      address: "Cra. 10 #30-65, Girardot, Cundinamarca, Colombia.",
      lat: 4.306204120274662,
      lng: -74.80368414232805,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.306204120274662,-74.80368414232805",
    },
    {
      title: "Asadero La Bonga",
      image: "img/Gastronomia/la_bonga.jpg",
      shortLabel: "Sabor local y tradición",
      longDescription:
        "Asadero La Bonga es un restaurante tradicional de Girardot con más de tres décadas de trayectoria. Es una referencia local para quienes buscan carnes a la brasa, pescados y un ambiente conocido por su atención familiar y su experiencia en preparaciones clásicas. Su recorrido en la ciudad lo mantiene como una parada reconocida por visitantes y residentes.",
      address: "Calle 20 #4-57, barrio Alto del Rosario, frente al Hotel Tocarema, Girardot, Colombia.",
      lat: 4.294739317139136,
      lng: -74.8013550865079,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.294739317139136,-74.8013550865079",
    },
    {
      title: "Casa Cruton By Cronch",
      image: "img/Gastronomia/casa_cruton.jpg",
      shortLabel: "Cocina creativa contemporánea",
      longDescription:
        "Casa Cruton By Cronch se presenta como un espacio con ambiente agradable, propuesta gastronómica moderna y una experiencia pensada para compartir en pareja, con amigos o en reuniones tranquilas. Su estilo y atmósfera cuidada lo convierten en una opción atractiva dentro de la oferta gastronómica de Girardot.",
      address: "Cl. 18 #7-69, Girardot, Cundinamarca.",
      lat: 4.29528672212228,
      lng: -74.80411002883595,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.29528672212228,-74.80411002883595",
    },
  ],
  nocturno_licor: [
    {
      title: "Pantera Café Bar",
      image: "img/Gastronomia/pantera.jpg",
      shortLabel: "Cócteles y ambiente lounge",
      longDescription:
        "Pantera Café Bar ofrece una experiencia nocturna elegante y moderna, combinando coctelería de autor, música cuidadosamente seleccionada y una atmósfera envolvente que invita a disfrutar de una noche diferente en Girardot; su ambiente íntimo, su propuesta estética y su enfoque en la calidad del servicio lo convierten en un punto ideal para iniciar o continuar los planes nocturnos con estilo y buena energía.",
      address: "Cra. 12 #20-50, Girardot, Cundinamarca.",
      lat: 4.299796720761712,
      lng: -74.80584747116404,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.299796720761712,-74.80584747116404",
    },
    {
      title: "Keops Discoteca Bar",
      image: "img/Gastronomia/keops.jpg",
      shortLabel: "Discoteca y energía nocturna",
      longDescription:
        "Keops Discoteca Bar es un espacio vibrante que reúne baile, música y un ambiente festivo en un formato clásico de discoteca-bar, ofreciendo noches llenas de energía donde el ritmo, las luces y la vida social se combinan para crear una experiencia animada y divertida, ideal para quienes buscan disfrutar la noche en un entorno dinámico y lleno de movimiento.",
      address: "Cl. 40, Girardot, Cundinamarca.",
      lat: 4.321950290690954,
      lng: -74.81074181349209,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.321950290690954,-74.81074181349209",
    },
    {
      title: "Discoteca Oasis",
      image: "img/Gastronomia/oasis.jpg",
      shortLabel: "Plan nocturno en zona comercial",
      longDescription:
        "Discoteca Oasis integra música, pista de baile y un ambiente festivo en una ubicación céntrica que facilita el encuentro entre amigos, convirtiéndose en un lugar ideal para quienes desean disfrutar la vida nocturna en un entorno dinámico donde la diversión, la energía y la interacción social se mezclan para crear noches memorables en Girardot.",
      address:
        "Carrera 10 #19-77, 3er piso, Centro Comercial Oasis, Girardot, Cundinamarca.",
      lat: 4.298086821277717,
      lng: -74.80471342883595,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.298086821277717,-74.80471342883595",
    },
  ],
};

const culturaData = {
  tradiciones_festivales: [
    {
      title: "Festival del Río",
      image: "img/Cultura/festival_rio.jpg",
      shortLabel: "Celebración cultural ribereña",
      longDescription:
        "El Festival del Río celebra la histórica relación entre Girardot y el río Magdalena mediante música, desfiles, actividades comunitarias y espacios familiares que resaltan la identidad cálida y festiva de la ciudad, consolidándose como un evento cultural que reúne tradición, participación ciudadana y un ambiente alegre que atrae tanto a residentes como a visitantes.",
      address: "Ribera del río Magdalena y corredores culturales de Girardot",
      lat: 4.3018,
      lng: -74.8071,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3018,-74.8071",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
    {
      title: "Reinado Nacional",
      image: "img/Cultura/reinado_nacional.jpg",
      shortLabel: "Tradición y agenda de ciudad",
      longDescription:
        "El Reinado Nacional forma parte de la agenda más representativa de Girardot, integrando actos protocolarios, actividades artísticas y espacios de encuentro que impulsan el turismo y fortalecen la vida cultural local, convirtiéndose en un evento emblemático que combina tradición, espectáculo y participación comunitaria durante la temporada.",
      address: "Escenarios de eventos y convenciones de Girardot",
      lat: 4.3041,
      lng: -74.8003,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3041,-74.8003",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
    {
      title: "Semana Santa en Girardot",
      image: "img/Cultura/semana_santa.jpg",
      shortLabel: "Fe y patrimonio espiritual",
      longDescription:
        "La Semana Santa en Girardot reúne tradición religiosa, procesiones y actividades de reflexión que convocan a residentes y visitantes, consolidándose como una experiencia cultural y espiritual profundamente arraigada en la memoria de la ciudad, donde la devoción, el patrimonio y la participación comunitaria se entrelazan en un ambiente solemne y significativo.",
      address: "Centro histórico y parroquias de Girardot",
      lat: 4.3048,
      lng: -74.8016,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.3048,-74.8016",
      hasMap: false,
      hasAddress: false,
      hasDirections: false,
    },
  ],
  arte_patrimonio: [
    {
      title: "Parque Bolívar",
      image: "img/Cultura/parque_bolivar.jpg",
      shortLabel: "Corazón histórico urbano",
      longDescription:
        "El Parque Bolívar es uno de los espacios más representativos del centro de Girardot, un punto donde convergen actividad ciudadana, historia urbana y una atmósfera ideal para recorrer el patrimonio local, ofreciendo un entorno agradable que combina zonas verdes, tránsito peatonal y elementos culturales que reflejan la identidad del municipio.",
      address: "Cl. 18 #11-11, Girardot, Cundinamarca.",
      lat: 4.297112190737793,
      lng: -74.80714331779092,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.297112190737793,-74.80714331779092",
    },
    {
      title: "Ruta Muralista",
      image: "img/Cultura/ruta_muralista.jpg",
      shortLabel: "Arte urbano con identidad",
      longDescription:
        "La Ruta Muralista invita a descubrir expresiones visuales que narran historias de barrio, memoria local y creatividad contemporánea, convirtiéndose en una caminata cultural muy atractiva para quienes disfrutan del arte en el espacio público, donde cada mural aporta una mirada distinta sobre la identidad, los procesos sociales y la sensibilidad artística de Girardot.",
      address: "Carrera 12, entre calle 13 y calle 14, Girardot, Cundinamarca.",
      lat: 4.294734406788456,
      lng: -74.80942536938478,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.294734406788456,-74.80942536938478",
    },
    {
      title: "CAS Teatro",
      image: "img/Cultura/cas_teatro.jpg",
      shortLabel: "Escena y formación cultural",
      longDescription:
        "CAS Teatro es un espacio fundamental para las artes escénicas en Girardot, con programación cultural, procesos formativos y actividades que fortalecen la vida artística de la ciudad, promoviendo la participación comunitaria y ofreciendo un escenario donde convergen teatro, expresión creativa y desarrollo cultural en un ambiente accesible y dinámico.",
      address: "Cl. 21 #11-10, Girardot, Cundinamarca.",
      lat: 4.2996476180945855,
      lng: -74.8049257,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=4.2996476180945855,-74.8049257",
    },
  ],
};

const overlayConfigs = {
  destinos: {
    title: { es: "Destinos", en: "Destinations" },
    kicker: { es: "Girardot en detalle", en: "Girardot in detail" },
    defaultTab: "folcloricas",
    tabs: {
      folcloricas: {
        label: { es: "Rutas Folclóricas", en: "Folkloric Routes" },
        items: destinosData.folcloricas,
      },
      urbanas: { label: { es: "Rutas Urbanas", en: "Urban Routes" }, items: destinosData.urbanas },
    },
  },
  gastronomia: {
    title: { es: "Gastronomía", en: "Gastronomy" },
    kicker: { es: "Sabores de Girardot", en: "Flavors of Girardot" },
    defaultTab: "restaurantes",
    tabs: {
      restaurantes: { label: { es: "Restaurantes", en: "Restaurants" }, items: gastronomiaData.restaurantes },
      nocturno_licor: {
        label: { es: "Nocturno y licor", en: "Nightlife & Drinks" },
        items: gastronomiaData.nocturno_licor,
      },
    },
  },
  cultura: {
    title: { es: "Cultura", en: "Culture" },
    kicker: { es: "Tradición y patrimonio", en: "Tradition and Heritage" },
    defaultTab: "tradiciones_festivales",
    tabs: {
      tradiciones_festivales: {
        label: { es: "Tradiciones y festivales", en: "Traditions and Festivals" },
        items: culturaData.tradiciones_festivales,
      },
      arte_patrimonio: {
        label: { es: "Arte y Patrimonio", en: "Art and Heritage" },
        items: culturaData.arte_patrimonio,
      },
    },
  },
};

const staticTranslations = {
  menuInicio: { es: "Inicio", en: "Home" },
  menuDestinos: { es: "Destinos", en: "Destinations" },
  menuGastronomia: { es: "Gastronomía", en: "Gastronomy" },
  menuCultura: { es: "Cultura", en: "Culture" },
  heroTagline: { es: "DESCUBRE", en: "DISCOVER" },
  aboutTitle: { es: "UN DESTINO CON BELLEZA NATURAL E HISTORIA", en: "A DESTINATION OF NATURAL BEAUTY AND HISTORY" },
  aboutText: {
    es: "Girardot, fundada oficialmente en el siglo XIX como punto comercial estratégico, se transformó con el tiempo en uno de los destinos favoritos del centro del país. Su clima cálido, con temperaturas agradables durante todo el año, la convierte en un lugar ideal para el descanso. Además de su oferta hotelera y recreativa, la ciudad mantiene una fuerte relación con el río Magdalena, eje histórico del transporte y del crecimiento económico regional, que hoy sigue siendo símbolo de identidad y atractivo para quienes la visitan.",
    en: "Girardot, officially founded in the 19th century as a strategic trade hub, became one of the most popular destinations in central Colombia. Its warm weather throughout the year makes it ideal for relaxation. Beyond its hotel and leisure offer, the city has a deep connection with the Magdalena River, a historic axis of transport and regional growth that remains a key symbol of local identity.",
  },
  aboutHighlight1Title: { es: "Clima cálido todo el año", en: "Warm weather all year round" },
  aboutHighlight1Text: {
    es: "Girardot disfruta de un clima cálido y estable durante los doce meses del año, lo que la convierte en un destino ideal para quienes buscan sol sin importar la temporada. Sus días luminosos invitan a disfrutar de piscinas, caminatas, deportes al aire libre y actividades recreativas en cualquier momento. Esta característica hace que la ciudad sea perfecta tanto para viajes espontáneos como para vacaciones planificadas, ofreciendo siempre un ambiente veraniego que revitaliza y conecta con la naturaleza.",
    en: "Girardot enjoys a warm and stable climate all year round, making it an ideal destination for those seeking sunshine no matter the season. Its sunny days invite visitors to enjoy swimming pools, hikes, outdoor sports, and recreational activities at any time. This makes the city perfect for both spontaneous trips and planned vacations, always offering a summery atmosphere that revitalizes and connects you with nature.",
  },
  aboutHighlight2Title: { es: "Destino cercano a Bogotá", en: "Close-to-Bogotá getaway" },
  aboutHighlight2Text: {
    es: "A solo unas horas de la capital, Girardot se ha consolidado como una de las escapadas preferidas por quienes desean desconectarse del ritmo urbano sin viajar demasiado lejos. Su ubicación estratégica permite planear visitas de fin de semana, puentes festivos o incluso viajes de un solo día. Esta cercanía facilita el acceso a su oferta turística, que incluye hoteles, gastronomía, actividades acuáticas y espacios de descanso, convirtiéndola en una opción práctica y atractiva para renovar energía rápidamente.",
    en: "Just a few hours from the capital, Girardot has established itself as a favorite getaway for those who want to escape the hustle and bustle of city life without traveling too far. Its strategic location makes it ideal for weekend getaways, long weekends, or even day trips. This proximity makes it easy to access its tourist attractions, which include hotels, dining, water activities, and relaxation spots, making it a practical and appealing option for quickly recharging your batteries.",
  },
  monumentosTitle: { es: "MONUMENTOS", en: "MONUMENTS" },
  hotelesTitle: { es: "HOTELES Y HOSPEDAJE", en: "HOTELS AND LODGING" },
  footerTitle: { es: "Turismo Girardot", en: "Girardot Tourism" },
  footerTagline: {
    es: "Experiencias auténticas para descubrir, descansar y volver.",
    en: "Authentic experiences to discover, relax, and return.",
  },
  footerLinkHome: { es: "Inicio", en: "Home" },
  footerLinkDestinos: { es: "Destinos", en: "Destinations" },
  footerLinkGastro: { es: "Gastronomía", en: "Gastronomy" },
  footerLinkCultura: { es: "Cultura", en: "Culture" },
  footerCopy: { es: "© 2026 Turismo Girardot. Todos los derechos reservados.", en: "© 2026 Girardot Tourism. All rights reserved." },
  
  creditosTitle: { 
  es: "Créditos", 
  en: "Credits" 
},

creditosText: {
  es: "El material fotográfico presentado en esta aplicación incluye imágenes de dominio público, recursos de bancos gratuitos como Unsplash y Pexels, y fotografías seleccionadas para ilustrar puntos de interés turístico de Girardot. Cada recurso visual se utiliza exclusivamente con fines informativos y de apoyo a la experiencia del usuario. Parte del texto explicativo y de apoyo fue redactado con la colaboración de Microsoft Copilot, manteniendo un enfoque descriptivo y coherente con la temática del proyecto.",
  en: "The photographic material featured in this app includes public domain images, resources from free stock photo sites such as Unsplash and Pexels, and photographs selected to illustrate tourist attractions in Girardot. Each visual resource is used exclusively for informational purposes and to enhance the user experience. Some of the explanatory and supporting text was drafted with the assistance of Microsoft Copilot, maintaining a descriptive tone consistent with the project’s theme."
},

};

const itemTranslations = {
  "Monumento El León": {
    title: "Lion Monument",
    description: "The Lion Monument is one of Girardot’s most iconic sculptures and an instantly recognizable landmark for anyone passing through the city. Its imposing presence and symbolic design make it a point of interest that captures the attention of visitors and residents alike, evoking strength, identity, and local tradition.",
    longDescription:
      "This monument is closely linked to the community work of the Girardot Lions Club, an organization founded in 1947 and recognized for its social work on behalf of vulnerable children. In 2019, the roundabout where it stands was completely renovated, giving way to a new version of the monument as part of an urban improvement project that revitalized the area. Thanks to this intervention, El León not only retains its symbolic value but also stands as a representative element of civic memory and the spirit of solidarity that characterizes the Girardot community.",
    address: "Cundinamarca, Girardot, Comuna 1, Granada neighborhood, Carrera 9 and 10 with Calle 20.",
  },
  "Monumento Jorge Eliécer Gaitán": {
    title: "Jorge Eliécer Gaitán Monument",
    description: "This monument honors the memory of Jorge Eliécer Gaitán, one of Colombia’s most influential political figures. Located in one of the busiest areas of downtown Girardot, it has become a landmark for those visiting the area, standing out for its commemorative nature and historical significance.",
    longDescription:
      "The sculpture was installed in 1949 in front of Parque de la Locomotora as a tribute following the events of 1948, which profoundly shaped the country’s history. Since then, the monument has stood in a central commercial and tourist area, surrounded by constant urban activity, trees, and public gathering spaces. Its presence at this strategic location reinforces its role as a reminder of Gaitán’s legacy and as part of the cultural heritage that connects the city to the nation’s social and political processes.",
    address: "Cundinamarca, Girardot, Comuna 1, downtown, Calle 16 with Carrera 14.",
  },
  "Monumento Danza del Sol": {
    title: "Sun Dance Monument",
    description: "The Danza del Sol Monument is a symbolic sculpture that welcomes visitors as they enter Girardot, conveying the warm and vibrant energy that characterizes the city. Its dynamic design evokes movement, light, and the town’s tourist appeal, making it a visually striking landmark for visitors.",
    longDescription:
      "Located at one of the city’s main entrances, along the road to Flandes and near the market square and the Ospina Pérez Bridge, this monument serves both as a tourist attraction and an element of urban beautification. Its presence reinforces the sense of welcome and reflects the warm atmosphere that characterizes Girardot, blending into the landscape as a symbol of hospitality and vitality. Furthermore, its strategic location makes it a landmark for those arriving by road, marking the beginning of the tourist experience within the municipality.",
    address: "Cundinamarca, Girardot, Comuna 2, Puerto Montero, Carrera 7 with Calle 8.",
  },
  "GHL Hotel Club el Puente": {
    title: "GHL Hotel Club el Puente",
    description: "GHL Hotel Club El Puente is a traditional-style hotel that combines rest, recreation, and a family-friendly atmosphere, making it ideal for weekend getaways. Its focus is on providing peace and comfort in an environment that invites you to relax from the moment you arrive.",
    longDescription:
      "The hotel features swimming pools, relaxation areas, fitness facilities, and green spaces that blend seamlessly into its serene surroundings, creating an experience designed to promote well-being. Its location near downtown Girardot provides easy access to recreational activities, restaurants, and tourist attractions in the region, making it a convenient choice for those looking to unwind without straying too far from the city.",
    address: "Kilometer 2, Girardot - Melgar Road, 252410 Girardot, Colombia.",
  },
  "Hotel Los Puentes Comfacundi": {
    title: "Hotel Los Puentes Comfacundi",
    description: "Hotel Los Puentes Comfacundi is a centrally located hotel that combines relaxation, recreation, and wellness, making it ideal for those seeking comfort without leaving the heart of Girardot. Its atmosphere, which strikes a balance between the urban and the laid-back, makes it an attractive option for a wide range of travelers.",
    longDescription:
      "Located near the Magdalena River and the bustling downtown area, the hotel offers comfortable rooms along with swimming pools, wellness areas, and recreational spaces designed for families, leisure travelers, and event attendees. Its strategic location provides easy access to the city’s main attractions, allowing guests to enjoy both city life and moments of relaxation within the hotel’s facilities.",
    address: "Carrera 12 #15-03, Girardot, Cundinamarca 252432, Colombia.",
  },
  "Condominio Campestre El Peñón": {
    title: "El Peñón Country Condominium",
    description: "El Peñón Country Condominium offers home-style accommodations with an emphasis on privacy, relaxation, and a natural setting, making it ideal for families or groups seeking a peaceful and comfortable stay. Its rural setting creates a relaxed atmosphere that invites guests to enjoy their free time without interruptions.",
    longDescription:
      "The homes within the condominium feature spacious interiors, outdoor areas, and green spaces that allow residents to enjoy outdoor activities in a safe and quiet environment. This option is particularly ideal for those seeking independence, comfort, and the opportunity to spend quality time in a peaceful setting—away from the noise of the city yet with quick access to Girardot’s amenities and attractions.",
    address: "House, Second Sector, Condominio El Peñón, 252432 Girardot, Colombia.",
  },
};

const itemTranslationsBySlug = {
  monumento_el_leon: itemTranslations["Monumento El León"],
  monumento_jorge_eliecer_gaitan: itemTranslations["Monumento Jorge Eliécer Gaitán"],
  monumento_danza_del_sol: itemTranslations["Monumento Danza del Sol"],
  ghl_hotel_club_el_puente: itemTranslations["GHL Hotel Club el Puente"],
  hotel_los_puentes_comfacundi: itemTranslations["Hotel Los Puentes Comfacundi"],
  condominio_campestre_el_penon: itemTranslations["Condominio Campestre El Peñón"],
  piscilago: {
    title: "Piscilago",
    longDescription:
      "Piscilago is perfect for family travel, combining aquatic attractions, relaxation areas, and environmental experiences. Its mix of recreation and biodiversity makes it one of Colombia's most recognized leisure parks.",
    address: "Kilometer 105 on the Bogota-Girardot road, five minutes from Melgar (Tolima), Colombia.",
  },
  cerro_de_la_cruz: {
    title: "Hill of the Cross",
    longDescription:
      "Hill of the Cross is a popular walk for visitors looking for panoramic views of Girardot and the nearby hills. The route includes moderately steep trails and natural surroundings, making it a good option for people who enjoy scenery and photography. Comfortable shoes, water, and extra care on sunny days are recommended.",
    address: "Girardot, Cundinamarca, Hill of the Cross sector.",
  },
  isla_del_sol: {
    title: "Isla del Sol",
    longDescription:
      "Isla del Sol is linked to relaxed outings and plans for couples, friends, or families. Its natural setting, warm weather, and connection with river tours make it an appealing stop for visitors who want a calmer experience near Girardot. It is a place to unwind, enjoy the scenery, and complement a visit to the riverside area.",
    address: "Tourist area of Isla del Sol, Girardot, Cundinamarca.",
  },
  embarcadero_turistico: {
    title: "Tourist Pier",
    longDescription:
      "From the Tourist Pier, visitors can enjoy river rides on different boats and discover Girardot from the Magdalena River. It is one of the city's most attractive fluvial experiences.",
    address: "Girardot Tourist Pier, Magdalena River waterfront, Girardot, Cundinamarca.",
  },
  puente_ferreo: {
    title: "Railway Bridge",
    longDescription:
      "The Railway Bridge is one of Girardot's most iconic landmarks. Once part of a strategic rail corridor, it now serves as a heritage walkway and scenic photo spot.",
    address: "Girardot Railway Bridge, Magdalena River sector, Girardot, Cundinamarca.",
  },
  parque_de_la_locomotora: {
    title: "Locomotora Park",
    longDescription:
      "Locomotora Park preserves the legacy of the old train station and rail structures that shaped local development. It is an emblematic stop for understanding Girardot's railway heritage.",
    address: "Cl. 16 #14-33, Girardot, Cundinamarca.",
  },
  parroquia_san_miguel: {
    title: "San Miguel Parish",
    longDescription:
      "San Miguel Parish is a spiritual and urban landmark in Girardot. Its location in the San Miguel neighborhood makes it a meaningful cultural stop in the city.",
    address: "Calle 12 No. 9-18, San Miguel neighborhood, Girardot, Cundinamarca.",
  },
  "el_cielo_-_gastrobar_discoteca": {
    title: "El Cielo - Gastrobar & Discoteca",
    longDescription:
      "El Cielo - Gastrobar & Discoteca combines dining, a viewpoint, and nightlife in one place. It can be described as an appealing option for visitors who want to have dinner, spend time with friends, and continue the evening in a venue with music and city views. Public promotions have shown approximate prices such as lunch offers from COP 20,000 and themed-event entry fees around COP 30,000, although these values may change.",
    address: "Cra. 10 #30-65, Girardot, Cundinamarca, Colombia.",
  },
  asadero_la_bonga: {
    title: "Asadero La Bonga",
    longDescription:
      "Asadero La Bonga is a long-standing restaurant in Girardot with more than three decades of experience. It is a local reference for visitors looking for grilled meats, fish dishes, and a familiar atmosphere backed by years of service. Its tradition in the city and focus on classic flavors are appreciated by both residents and tourists.",
    address: "Calle 20 #4-57, Alto del Rosario neighborhood, in front of Hotel Tocarema, Girardot, Colombia.",
  },
  casa_cruton_by_cronch: {
    title: "Casa Cruton By Cronch",
    longDescription:
      "Casa Cruton By Cronch can be presented as a venue with a pleasant atmosphere, a modern food concept, and an experience designed for couples, friends, or relaxed gatherings. Its style, inviting setting, and social vibe make it a valuable stop in Girardot's dining scene.",
    address: "Cl. 18 #7-69, Girardot, Cundinamarca.",
  },
  pantera_cafe_bar: {
    title: "Pantera Cafe Bar",
    longDescription:
      "Pantera Café Bar offers a sophisticated and modern nightlife experience, combining signature cocktails, carefully curated music, and an immersive atmosphere that invites you to enjoy a unique night out in Girardot; its intimate ambiance, stylish design, and commitment to quality service make it the perfect spot to kick off or continue your evening plans in style and with a positive vibe.",
    address: "Cra. 12 #20-50, Girardot, Cundinamarca.",
  },
  keops_discoteca_bar: {
    title: "Keops Discoteca Bar",
    longDescription:
      "Keops Discoteca Bar is a vibrant venue that combines dancing, music, and a festive atmosphere in a classic nightclub-bar setting, offering energetic nights where rhythm, lights, and socializing come together to create a lively and fun experience—perfect for those looking to enjoy the night in a dynamic, bustling environment.",
    address: "Cl. 40, Girardot, Cundinamarca.",
  },
  discoteca_oasis: {
    title: "Oasis Nightclub",
    longDescription:
      "Oasis Nightclub combines music, a dance floor, and a festive atmosphere in a central location that makes it easy to meet up with friends, making it the perfect spot for those who want to enjoy the nightlife in a vibrant setting where fun, energy, and social interaction come together to create unforgettable nights in Girardot.",
    address: "Carrera 10 #19-77, 3rd floor, Oasis Shopping Center, Girardot, Cundinamarca.",
  },
  festival_del_rio: {
    title: "River Festival",
    longDescription:
      "The River Festival celebrates the historic relationship between Girardot and the Magdalena River through music, parades, community activities, and family-friendly events that highlight the city’s warm and festive spirit, establishing itself as a cultural event that brings together tradition, community participation, and a joyful atmosphere that attracts both residents and visitors.",
  },
  reinado_nacional: {
    title: "National Pageant",
    longDescription:
      "The National Beauty Pageant is one of Girardot’s most iconic events, featuring formal ceremonies, artistic activities, and social gatherings that promote tourism and enrich local cultural life, making it a flagship event that combines tradition, entertainment, and community participation throughout the season.",
  },
  semana_santa_en_girardot: {
    title: "Holy Week in Girardot",
    longDescription:
      "Holy Week in Girardot brings together religious tradition, processions, and activities of reflection that draw residents and visitors alike, establishing itself as a cultural and spiritual experience deeply rooted in the city’s memory, where devotion, heritage, and community participation intertwine in a solemn and meaningful atmosphere.",
  },
  parque_bolivar: {
    title: "Bolivar Park",
    longDescription:
      "Bolívar Park is one of the most iconic spaces in downtown Girardot, a place where community life, urban history, and an ideal atmosphere for exploring the local heritage come together, offering a pleasant setting that combines green spaces, pedestrian traffic, and cultural elements that reflect the town’s identity.",
    address: "Cl. 18 #11-11, Girardot, Cundinamarca.",
  },
  ruta_muralista: {
    title: "Mural Route",
    longDescription:
      "The Mural Route invites visitors to discover visual expressions that tell stories of the neighborhood, local history, and contemporary creativity, making it a highly engaging cultural walking tour for those who appreciate art in public spaces, where each mural offers a unique perspective on Girardot’s identity, social dynamics, and artistic sensibility.",
    address: "Carrera 12, between Calle 13 and Calle 14, Girardot, Cundinamarca.",
  },
  cas_teatro: {
    title: "CAS Theater",
    longDescription:
      "CAS Teatro is a vital venue for the performing arts in Girardot, offering cultural programming, educational initiatives, and activities that enrich the city’s artistic life, foster community engagement, and provide a space where theater, creative expression, and cultural development come together in an accessible and dynamic environment.",
    address: "Cl. 21 #11-10, Girardot, Cundinamarca.",
  },
};

function pickLang(value) {
  if (value && typeof value === "object" && "es" in value && "en" in value) {
    return value[currentLanguage] || value.es;
  }
  return value;
}

function localizeItem(item) {
  if (currentLanguage === "es") return item;
  const normalized = (item.title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  const translated = itemTranslations[item.title] || itemTranslationsBySlug[normalized];
  if (!translated) return item;
  return {
    ...item,
    title: translated.title || item.title,
    description: translated.description || item.description,
    longDescription: translated.longDescription || item.longDescription,
    address: translated.address || item.address,
  };
}

const overlayTabThemes = {
  destinos: {
    folcloricas: {
      panelBg: "linear-gradient(135deg, #f5f9fc 0%, #ebf2f8 100%)",
      panelBorder: "rgba(208, 223, 236, 0.7)",
      accent: "#2f6a95",
      cardFooterBg: "#edf4f9",
      cardFooterText: "#1f3345",
      panelTitle: "#152839",
      kickerColor: "#577489",
      tabsBg: "#e2ebf3",
      tabText: "#4f677a",
      detailBg: "linear-gradient(140deg, #f8fbfd 0%, #e9f1f7 100%)",
      detailBorder: "#d0dfea",
      detailTitle: "#163042",
      detailText: "#476176",
      detailImageBg: "linear-gradient(145deg, #ebf3f9 0%, #f2f7fb 100%)",
    },
    urbanas: {
      panelBg: "linear-gradient(135deg, #f7f8fc 0%, #edf0f8 100%)",
      panelBorder: "rgba(212, 214, 236, 0.75)",
      accent: "#4d5f9a",
      cardFooterBg: "#eef0fb",
      cardFooterText: "#28345e",
      panelTitle: "#1d2747",
      kickerColor: "#657a92",
      tabsBg: "#e2e7f3",
      tabText: "#4f5f82",
      detailBg: "linear-gradient(140deg, #f6f8fd 0%, #e9eef8 100%)",
      detailBorder: "#d4dbef",
      detailTitle: "#263763",
      detailText: "#4c5f86",
      detailImageBg: "linear-gradient(145deg, #edf1fa 0%, #f6f8fd 100%)",
    },
  },
  gastronomia: {
    restaurantes: {
      panelBg: "linear-gradient(135deg, #fcf7f1 0%, #f6eee3 100%)",
      panelBorder: "rgba(226, 206, 178, 0.75)",
      accent: "#96613d",
      cardFooterBg: "#f8ede0",
      cardFooterText: "#50331f",
      panelTitle: "#392314",
      kickerColor: "#7a5d45",
      tabsBg: "#eee1d2",
      tabText: "#6f4c30",
      detailBg: "linear-gradient(140deg, #fcf7f1 0%, #f4ebde 100%)",
      detailBorder: "#e3d2bc",
      detailTitle: "#4d301a",
      detailText: "#6b4b30",
      detailImageBg: "linear-gradient(145deg, #f7ecde 0%, #fcf6ec 100%)",
    },
    nocturno_licor: {
      panelBg: "linear-gradient(135deg, #252733 0%, #1d2230 55%, #26203a 100%)",
      panelBorder: "rgba(108, 116, 152, 0.55)",
      accent: "#6152a5",
      cardFooterBg: "#2c3143",
      cardFooterText: "#eef2ff",
      panelTitle: "#eef1ff",
      kickerColor: "#a8b6d7",
      tabsBg: "#353a4f",
      tabText: "#cdd6f2",
      detailBg: "linear-gradient(140deg, #272b3a 0%, #1f2533 100%)",
      detailBorder: "#555e7f",
      detailTitle: "#eff2ff",
      detailText: "#c2cbe8",
      detailImageBg: "linear-gradient(145deg, #32384c 0%, #262c3e 100%)",
    },
  },
  cultura: {
    tradiciones_festivales: {
      panelBg: "linear-gradient(135deg, #f8f3eb 0%, #f2e9dd 100%)",
      panelBorder: "rgba(223, 203, 177, 0.78)",
      accent: "#8e6642",
      cardFooterBg: "#f5e9d8",
      cardFooterText: "#4e3722",
      panelTitle: "#3e2919",
      kickerColor: "#7e684f",
      tabsBg: "#efe2d1",
      tabText: "#684d35",
      detailBg: "linear-gradient(140deg, #f8f2e9 0%, #eee3d4 100%)",
      detailBorder: "#dfcbb1",
      detailTitle: "#4a301d",
      detailText: "#6e5138",
      detailImageBg: "linear-gradient(145deg, #f2e5d4 0%, #faf3e8 100%)",
    },
    arte_patrimonio: {
      panelBg: "linear-gradient(135deg, #f1f5f8 0%, #e6edf3 100%)",
      panelBorder: "rgba(194, 210, 224, 0.8)",
      accent: "#3f6f8d",
      cardFooterBg: "#e8f0f6",
      cardFooterText: "#213f55",
      panelTitle: "#183247",
      kickerColor: "#5d7c91",
      tabsBg: "#dfeaf3",
      tabText: "#3f6279",
      detailBg: "linear-gradient(140deg, #f1f6fa 0%, #e4edf4 100%)",
      detailBorder: "#c9dce9",
      detailTitle: "#1d3b51",
      detailText: "#42657d",
      detailImageBg: "linear-gradient(145deg, #e9f1f8 0%, #f4f8fc 100%)",
    },
  },
};

// Carrusel horizontal infinito: clona la primera diapositiva para reinicio suave.
function setupHeroCarousel() {
  if (!heroTrack || heroSlides.length < 2) return;

  const firstClone = heroSlides[0].cloneNode(true);
  heroTrack.appendChild(firstClone);

  const totalSlides = heroTrack.children.length;
  heroTrack.style.width = `${totalSlides * 100}%`;
  Array.from(heroTrack.children).forEach((slide) => {
    slide.style.width = `${100 / totalSlides}%`;
  });

  const moveSlide = () => {
    heroIndex += 1;
    heroTrack.style.transition = "transform 1.2s ease";
    heroTrack.style.transform = `translateX(-${heroIndex * (100 / totalSlides)}%)`;

    if (heroIndex === totalSlides - 1) {
      setTimeout(() => {
        heroTrack.style.transition = "none";
        heroTrack.style.transform = "translateX(0)";
        heroIndex = 0;
      }, 1250);
    }
  };

  heroTimer = setInterval(moveSlide, 4500);
}

const sectionData = {
  monumentos: {
    imageId: "monumentosImage",
    listId: "monumentosList",
    activeIndex: 0,
    items: [
      {
        title: "Monumento El León",
        image: "img/monumento1.jpg",
        description:
          "El Monumento El León es una de las esculturas más emblemáticas de Girardot y un referente inmediato para quienes transitan por la ciudad. Su presencia imponente y su diseño simbólico lo convierten en un punto de interés que atrae la atención de visitantes y residentes, evocando fortaleza, identidad y tradición local.",
        longDescription:
          "Esta obra está estrechamente ligada al trabajo comunitario del Club de Leones de Girardot, organización fundada en 1947 y reconocida por su labor social en beneficio de la infancia vulnerable. En 2019, la glorieta donde se encuentra fue completamente renovada, dando paso a una nueva versión del monumento integrada dentro de un proyecto de mejoramiento urbano que revitalizó el sector. Gracias a esta intervención, El León no solo conserva su valor simbólico, sino que también se consolida como un elemento representativo de la memoria cívica y del compromiso solidario que caracteriza a la comunidad girardoteña.",
        address:
          "Cundinamarca, Girardot, comuna 1, barrio Granada, carrera 9 y 10 con calle 20.",
        lat: 4.2977457346507935,
        lng: -74.80435169087451,
      },
      {
        title: "Monumento Jorge Eliécer Gaitán",
        image: "img/monumento2.jpg",
        description:
          "Este monumento honra la memoria de Jorge Eliécer Gaitán, una de las figuras políticas más influyentes de Colombia. Ubicado en una de las zonas más concurridas del centro de Girardot, se ha convertido en un punto de referencia para quienes recorren el sector, destacándose por su carácter conmemorativo y su presencia histórica.",
        longDescription:
          "La escultura fue instalada en 1949 frente al entorno del Parque de la Locomotora, como homenaje tras los acontecimientos de 1948 que marcaron profundamente la historia del país. Desde entonces, el monumento permanece en un área central, comercial y turística, rodeado de actividad urbana constante, árboles y espacios de encuentro ciudadano. Su permanencia en este punto estratégico refuerza su papel como recordatorio del legado de Gaitán y como parte del patrimonio cultural que conecta a la ciudad con los procesos sociales y políticos de la nación.",
        address: "Cundinamarca, Girardot, comuna 1, centro, calle 16 con carrera 14.",
        lat: 4.300834646289338,
        lng: -74.80930699982211,
      },
      {
        title: "Monumento Danza del Sol",
        image: "img/monumento3.jpg",
        description:
          "El Monumento Danza del Sol es una escultura simbólica que da la bienvenida a quienes ingresan a Girardot, transmitiendo la energía cálida y vibrante que caracteriza a la ciudad. Su diseño dinámico evoca movimiento, luz y la esencia turística del municipio, convirtiéndose en un punto visualmente atractivo para los visitantes.",
        longDescription:
          "Ubicado en una de las entradas principales de la ciudad, sobre la vía hacia Flandes y cerca de la plaza de mercado y el puente Ospina Pérez, este monumento cumple una función tanto turística como de embellecimiento urbano. Su presencia refuerza la idea de bienvenida y refleja el clima cálido que distingue a Girardot, integrándose al paisaje como un símbolo de hospitalidad y vitalidad. Además, su ubicación estratégica lo convierte en un referente para quienes llegan por carretera, marcando el inicio de la experiencia turística dentro del municipio.",
        address: "Cundinamarca, Girardot, comuna 2, Puerto Montero, carrera 7 con calle 8.",
        lat: 4.289201540595745,
        lng: -74.80718504563838,
      },
    ],
  },
  hoteles: {
    imageId: "hotelesImage",
    listId: "hotelesList",
    activeIndex: 0,
    items: [
      {
        title: "GHL Hotel Club el Puente",
        image: "img/hotel1.jpg",
        description:
          "GHL Hotel Club El Puente es un alojamiento de estilo tradicional que combina descanso, recreación y un ambiente familiar ideal para escapadas de fin de semana. Su propuesta se centra en ofrecer tranquilidad y comodidad en un entorno que invita a relajarse desde el primer momento.",
        longDescription:
          "El hotel cuenta con piscinas, zonas de relajación, espacios deportivos y áreas verdes que se integran armónicamente a su ambiente sereno, creando una experiencia pensada para el bienestar. Su ubicación cercana al centro de Girardot permite acceder fácilmente a actividades recreativas, restaurantes y atractivos turísticos de la región, convirtiéndolo en una opción práctica para quienes buscan desconectarse sin alejarse demasiado de la ciudad.",
        address: "Kilometro 2 Via Girardot - Melgar, 252410 Girardot, Colombia.",
        lat: 4.292842945058661,
        lng: -74.7855859735035,
      },
      {
        title: "Hotel Los Puentes Comfacundi",
        image: "img/hotel2.jpg",
        description:
          "Hotel Los Puentes Comfacundi es un hospedaje céntrico que combina descanso, recreación y bienestar, ideal para quienes buscan comodidad sin salir del corazón de Girardot. Su ambiente equilibrado entre lo urbano y lo relajado lo convierte en una alternativa atractiva para diferentes tipos de viajeros.",
        longDescription:
          "Ubicado cerca del río Magdalena y del movimiento comercial del centro, el hotel ofrece habitaciones confortables junto con piscinas, zonas de bienestar y espacios recreativos diseñados para familias, viajeros de descanso o asistentes a eventos. Su ubicación estratégica facilita el acceso a los principales puntos de interés de la ciudad, permitiendo disfrutar tanto de la vida urbana como de momentos de relajación dentro de sus instalaciones.",
        address: "Carrera 12 #15-03, Girardot, Cundinamarca 252432, Colombia.",
        lat: 4.295992224753226,
        lng: -74.80894331906761,
      },
      {
        title: "Condominio Campestre El Peñón",
        image: "img/hotel3.jpg",
        description:
          "El Condominio Campestre El Peñón ofrece un alojamiento tipo casa con enfoque en privacidad, descanso y ambiente natural, ideal para familias o grupos que buscan una estadía tranquila y cómoda. Su entorno campestre crea una atmósfera relajada que invita a disfrutar del tiempo libre sin interrupciones.",
        longDescription:
          "Las viviendas dentro del condominio cuentan con espacios amplios, zonas exteriores y áreas verdes que permiten disfrutar de actividades al aire libre en un ambiente seguro y silencioso. Esta opción es especialmente conveniente para quienes desean independencia, comodidad y la posibilidad de compartir momentos de calidad en un entorno sereno, lejos del ruido urbano pero con acceso rápido a los servicios y atractivos de Girardot.",
        address: "Casa, Segundo Sector, Condominio El Peñón, 252432 Girardot, Colombia.",
        lat: 4.311657882082693,
        lng: -74.76888086854618,
      },
    ],
  },
};

// Construye cada item de la lista lateral con su estado expandible.
function createItemMarkup(item, index, activeIndex) {
  const localized = localizeItem(item);
  const wrapper = document.createElement("article");
  wrapper.className = `experience-item${index === activeIndex ? " active" : ""}`;
  wrapper.innerHTML = `
    <button class="item-button" type="button" aria-expanded="${index === activeIndex ? "true" : "false"}">
      <span class="item-left">
        <span class="item-dot" aria-hidden="true"></span>
        <span class="item-title">${localized.title}</span>
      </span>
      <span class="item-arrow" aria-hidden="true">&#8250;</span>
    </button>
    <p class="item-desc">${localized.description}</p>
  `;
  return wrapper;
}

// Transicion suave al cambiar la imagen principal de cada seccion.
function swapImageWithFade(imageElement, nextSrc, nextAlt) {
  imageElement.classList.add("media-swapping");
  setTimeout(() => {
    imageElement.src = nextSrc;
    imageElement.alt = nextAlt;
    imageElement.classList.remove("media-swapping");
  }, 170);
}

// Logica reutilizable para "Monumentos" y "Hoteles y hospedaje".
function setupExperienceSection(config) {
  const imageElement = document.getElementById(config.imageId);
  const listElement = document.getElementById(config.listId);
  if (!imageElement || !listElement) return;

  listElement.innerHTML = "";
  const activeIndex = config.activeIndex ?? 0;
  config.items.forEach((item, index) => {
    listElement.appendChild(createItemMarkup(item, index, activeIndex));
  });

  const activeItem = localizeItem(config.items[activeIndex] || config.items[0]);
  if (activeItem) {
    imageElement.src = activeItem.image;
    imageElement.alt = activeItem.title;
  }

  const cards = Array.from(listElement.querySelectorAll(".experience-item"));

  cards.forEach((card, idx) => {
    const btn = card.querySelector(".item-button");
    btn.addEventListener("click", () => {
      cards.forEach((otherCard) => {
        otherCard.classList.remove("active");
        otherCard.querySelector(".item-button").setAttribute("aria-expanded", "false");
      });

      card.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
      config.activeIndex = idx;
      const chosen = config.items[idx];
      swapImageWithFade(imageElement, chosen.image, chosen.title);
    });
  });
}

function createPanelMap(item) {
  const detailMap = document.getElementById("detailMap");
  if (!detailMap) return;

  if (detailMapInstance) {
    detailMapInstance.remove();
    detailMapInstance = null;
  }

  if (typeof window.L === "undefined") {
    detailMap.innerHTML =
      "<div style='display:grid;place-items:center;height:100%;color:#3f5a70;font-weight:500;'>Mapa no disponible en este momento.</div>";
    return;
  }

  detailMap.innerHTML = "";
  const localized = localizeItem(item);
  detailMapInstance = L.map(detailMap, {
    zoomControl: true,
    attributionControl: true,
  }).setView([item.lat, item.lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(detailMapInstance);

  L.marker([item.lat, item.lng])
    .addTo(detailMapInstance)
    .bindPopup(`<span>${localized.title}</span>`)
    .openPopup();
  setTimeout(() => detailMapInstance.invalidateSize(), 210);
}

function openDetailPanel(sectionKey) {
  const section = sectionData[sectionKey];
  if (!section || !detailOverlay || !detailPanel) return;

  const selectedItem = section.items[section.activeIndex ?? 0];
  if (!selectedItem) return;
  activeDetailSectionKey = sectionKey;
  const localized = localizeItem(selectedItem);

  detailKicker.textContent =
    sectionKey === "monumentos"
      ? currentLanguage === "es"
        ? "Monumento destacado"
        : "Featured monument"
      : currentLanguage === "es"
        ? "Hospedaje recomendado"
        : "Recommended lodging";
  detailTitle.textContent = localized.title;
  detailShort.textContent = localized.description;
  detailLong.textContent = localized.longDescription;
  detailAddress.textContent = localized.address;
  if (detailMapsLink) {
    detailMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.lng}`;
    detailMapsLink.textContent = currentLanguage === "es" ? "Ver en Google Maps" : "View on Google Maps";
    detailMapsLink.setAttribute(
      "aria-label",
      `${currentLanguage === "es" ? "Ver" : "View"} ${localized.title} ${
        currentLanguage === "es" ? "en Google Maps" : "on Google Maps"
      }`
    );
  }

  detailOverlay.classList.add("open");
  detailOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  createPanelMap(selectedItem);
}

function closeDetailPanel() {
  if (!detailOverlay) return;
  detailOverlay.classList.remove("open");
  detailOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeDetailSectionKey = null;
}

function setupExplorePanel() {
  const exploreButtons = document.querySelectorAll(".explore-btn[data-explore-section]");

  exploreButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sectionKey = btn.getAttribute("data-explore-section");
      if (!sectionKey) return;
      openDetailPanel(sectionKey);
    });
  });

  if (detailClose) {
    detailClose.addEventListener("click", closeDetailPanel);
  }

  if (detailOverlay) {
    detailOverlay.addEventListener("click", (event) => {
      if (event.target === detailOverlay) {
        closeDetailPanel();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && detailOverlay?.classList.contains("open")) {
      closeDetailPanel();
    }
  });
}

function applyOverlayTheme(tabKey) {
  const modeThemes = overlayTabThemes[activeOverlayMode];
  const selectedTheme = modeThemes?.[tabKey];
  if (!destinosPanel || !destinosOverlay || !selectedTheme) return;

  destinosOverlay.style.setProperty("--overlay-panel-bg", selectedTheme.panelBg);
  destinosOverlay.style.setProperty("--overlay-panel-border", selectedTheme.panelBorder);
  destinosOverlay.style.setProperty("--overlay-accent", selectedTheme.accent);
  destinosOverlay.style.setProperty("--overlay-card-footer-bg", selectedTheme.cardFooterBg);
  destinosOverlay.style.setProperty("--overlay-card-footer-text", selectedTheme.cardFooterText);
  destinosOverlay.style.setProperty("--overlay-panel-title", selectedTheme.panelTitle);
  destinosOverlay.style.setProperty("--overlay-kicker-color", selectedTheme.kickerColor || "#577489");
  destinosOverlay.style.setProperty("--overlay-tabs-bg", selectedTheme.tabsBg || "#e2ebf3");
  destinosOverlay.style.setProperty("--overlay-tab-text", selectedTheme.tabText || "#4f677a");
  destinosOverlay.style.setProperty("--overlay-detail-bg", selectedTheme.detailBg || selectedTheme.panelBg);
  destinosOverlay.style.setProperty("--overlay-detail-border", selectedTheme.detailBorder || "#d0dfea");
  destinosOverlay.style.setProperty("--overlay-detail-title", selectedTheme.detailTitle || "#163042");
  destinosOverlay.style.setProperty("--overlay-detail-text", selectedTheme.detailText || "#476176");
  destinosOverlay.style.setProperty(
    "--overlay-detail-image-bg",
    selectedTheme.detailImageBg || "linear-gradient(145deg, #ebf3f9 0%, #f2f7fb 100%)"
  );
}

function updateOverlayPanelHeight() {
  if (!destinosPanel || !destinosGrid) return;
  const panelHeader = destinosPanel.querySelector(".destinos-header");
  if (!panelHeader) return;

  const visibleCardCount = destinosGrid.querySelectorAll(".destino-card").length;
  const columnCount = Math.min(Math.max(visibleCardCount, 1), 4);
  destinosPanel.style.setProperty("--overlay-columns", String(columnCount));

  if (window.innerWidth > 680) {
    const cardMinWidth = 210;
    const gapWidth = 16;
    const sidePadding = 64;
    const contentWidth = columnCount * cardMinWidth + (columnCount - 1) * gapWidth + sidePadding;
    const minPanelWidth = columnCount >= 4 ? 980 : 760;
    const preferredWidth = Math.max(contentWidth, minPanelWidth);
    destinosPanel.style.width = `${Math.min(preferredWidth, Math.floor(window.innerWidth * 0.94))}px`;
  } else {
    destinosPanel.style.width = "";
    destinosPanel.style.setProperty("--overlay-columns", "2");
  }

  // Recalcula despues de aplicar columnas/ancho para evitar altura erratica en primera apertura.
  const desiredHeight = panelHeader.offsetHeight + destinosGrid.scrollHeight + 8;
  const maxHeight = Math.floor(window.innerHeight * 0.88);
  destinosPanel.style.height = `${Math.min(desiredHeight, maxHeight)}px`;
}

function renderDestinosCards(tabKey) {
  if (!destinosGrid) return;
  const modeConfig = overlayConfigs[activeOverlayMode];
  const items = modeConfig?.tabs?.[tabKey]?.items || [];

  destinosGrid.innerHTML = items
    .map(
      (item, idx) => `
      <button class="destino-card" type="button" data-tab="${tabKey}" data-index="${idx}">
        <img class="destino-card-image" src="${item.image}" alt="${localizeItem(item).title}" />
        <p class="destino-card-title">${localizeItem(item).title}</p>
      </button>
    `
    )
    .join("");

  destinosGrid.querySelectorAll(".destino-card").forEach((card) => {
    card.addEventListener("click", () => {
      const tab = card.getAttribute("data-tab");
      const index = Number(card.getAttribute("data-index"));
      const selected = modeConfig?.tabs?.[tab]?.items?.[index];
      if (!selected) return;
      openDestinoDetail(selected, card);
    });
  });

  destinosGrid.querySelectorAll(".destino-card-image").forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", updateOverlayPanelHeight, { once: true });
      image.addEventListener("error", updateOverlayPanelHeight, { once: true });
    }
  });

  requestAnimationFrame(() => {
    updateOverlayPanelHeight();
    requestAnimationFrame(updateOverlayPanelHeight);
  });
}

function setActiveDestinosTab(tabKey) {
  activeDestinosTab = tabKey;
  destinosTabs?.querySelectorAll(".destinos-tab").forEach((tabBtn) => {
    tabBtn.classList.toggle("active", tabBtn.getAttribute("data-tab") === tabKey);
  });
  applyOverlayTheme(tabKey);
  renderDestinosCards(tabKey);
}

function configureOverlayMode(modeKey) {
  const modeConfig = overlayConfigs[modeKey];
  if (!modeConfig || !destinosTabs) return;

  activeOverlayMode = modeKey;
  if (destinosTitle) destinosTitle.textContent = pickLang(modeConfig.title);
  if (destinosKicker) destinosKicker.textContent = pickLang(modeConfig.kicker);

  const tabButtons = Array.from(destinosTabs.querySelectorAll(".destinos-tab"));
  const tabEntries = Object.entries(modeConfig.tabs);

  tabButtons.forEach((button, index) => {
    const entry = tabEntries[index];
    if (!entry) {
      button.style.display = "none";
      return;
    }
    const [tabKey, tabData] = entry;
    button.style.display = "";
    button.textContent = pickLang(tabData.label);
    button.setAttribute("data-tab", tabKey);
  });

  setActiveDestinosTab(modeConfig.defaultTab);
}

function createDestinoDetailMap(item) {
  const mapContainer = document.getElementById("destinoDetailMap");
  if (!mapContainer) return;

  if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }

  if (typeof window.L === "undefined") {
    mapContainer.innerHTML =
      "<div style='display:grid;place-items:center;height:100%;color:#345167;font-weight:600;'>Mapa no disponible.</div>";
    return;
  }

  mapContainer.innerHTML = "";
  const localized = localizeItem(item);
  destinoDetailMapInstance = L.map(mapContainer, {
    zoomControl: true,
    attributionControl: true,
  }).setView([item.lat, item.lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(destinoDetailMapInstance);

  L.marker([item.lat, item.lng]).addTo(destinoDetailMapInstance).bindPopup(localized.title).openPopup();
  setTimeout(() => destinoDetailMapInstance?.invalidateSize(), 180);
}

function animateDestinoCardExpansion(sourceCard, item) {
  if (!sourceCard || !destinoDetailCard) return;

  const sourceRect = sourceCard.getBoundingClientRect();
  const ghost = document.createElement("div");
  ghost.className = "destino-card-ghost";
  ghost.style.left = `${sourceRect.left}px`;
  ghost.style.top = `${sourceRect.top}px`;
  ghost.style.width = `${sourceRect.width}px`;
  ghost.style.height = `${sourceRect.height}px`;
  ghost.innerHTML = `<img src="${item.image}" alt="${item.title}" /><p>${item.title}</p>`;
  document.body.appendChild(ghost);

  destinoDetailCard.classList.add("is-hidden-for-morph");
  const targetRect = destinoDetailCard.getBoundingClientRect();

  requestAnimationFrame(() => {
    ghost.style.transition = "all 420ms cubic-bezier(0.2, 0.72, 0.2, 1)";
    ghost.style.left = `${targetRect.left}px`;
    ghost.style.top = `${targetRect.top}px`;
    ghost.style.width = `${targetRect.width}px`;
    ghost.style.height = `${targetRect.height}px`;
    ghost.style.borderRadius = "20px";
  });

  setTimeout(() => {
    destinoDetailCard.classList.remove("is-hidden-for-morph");
    ghost.remove();
  }, 440);
}

function openDestinoDetail(item, sourceCard) {
  if (!destinoDetailOverlay || !destinoDetailCard) return;
  const localized = localizeItem(item);

  destinoDetailImage.src = item.image;
  destinoDetailImage.alt = localized.title;
  destinoDetailTitle.textContent = localized.title;
  destinoDetailDescription.textContent = localized.longDescription;
  destinoDetailAddress.textContent = localized.address || "";
  destinoDetailMapsLink.href =
    item.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
  destinoDetailMapsLink.textContent = currentLanguage === "es" ? "Cómo llegar" : "Get directions";
  destinoDetailMapsLink.setAttribute(
    "aria-label",
    `${currentLanguage === "es" ? "Abrir" : "Open"} ${localized.title} ${
      currentLanguage === "es" ? "en Google Maps" : "in Google Maps"
    }`
  );

  const showAddress = item.hasAddress !== false;
  const showDirections = item.hasDirections !== false;
  const showMap = item.hasMap !== false;

  destinoDetailAddressBox?.classList.toggle("is-hidden", !showAddress);
  destinoDetailMapsLink?.classList.toggle("is-hidden", !showDirections);
  destinoDetailMapWrap?.classList.toggle("is-hidden", !showMap);
  destinoDetailCard.classList.toggle("text-priority", !showMap && !showAddress && !showDirections);

  destinoDetailOverlay.classList.add("open");
  destinoDetailOverlay.setAttribute("aria-hidden", "false");

  animateDestinoCardExpansion(sourceCard, item);
  if (showMap) {
    createDestinoDetailMap(item);
  } else if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }
}

function closeDestinoDetail() {
  if (!destinoDetailOverlay) return;
  destinoDetailOverlay.classList.remove("open");
  destinoDetailOverlay.setAttribute("aria-hidden", "true");
  if (destinoDetailMapInstance) {
    destinoDetailMapInstance.remove();
    destinoDetailMapInstance = null;
  }
}

function openDestinosPanel(modeKey = "destinos") {
  if (!destinosOverlay) return;
  configureOverlayMode(modeKey);
  destinosOverlay.classList.add("open");
  destinosOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("destinos-open");
  requestAnimationFrame(() => {
    updateOverlayPanelHeight();
    setTimeout(updateOverlayPanelHeight, 80);
  });
}

function closeDestinosPanel() {
  if (!destinosOverlay) return;
  closeDestinoDetail();
  destinosOverlay.classList.remove("open");
  destinosOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("destinos-open");
  if (destinosPanel) destinosPanel.style.height = "";
}

function setupDestinosExperience() {
  if (menuDestinos) {
    menuDestinos.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("destinos");
    });
  }

  if (menuGastronomia) {
    menuGastronomia.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("gastronomia");
    });
  }

  if (menuCultura) {
    menuCultura.addEventListener("click", (event) => {
      event.preventDefault();
      openDestinosPanel("cultura");
    });
  }

  destinosClose?.addEventListener("click", closeDestinosPanel);

  destinosTabs?.querySelectorAll(".destinos-tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const tabKey = tabBtn.getAttribute("data-tab");
      if (!tabKey || tabKey === activeDestinosTab) return;
      setActiveDestinosTab(tabKey);
    });
  });

  destinosOverlay?.addEventListener("click", (event) => {
    if (event.target === destinosOverlay) {
      closeDestinosPanel();
    }
  });

  destinoDetailClose?.addEventListener("click", closeDestinoDetail);

  destinoDetailOverlay?.addEventListener("click", (event) => {
    if (event.target === destinoDetailOverlay) {
      closeDestinoDetail();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (destinoDetailOverlay?.classList.contains("open")) {
      closeDestinoDetail();
      return;
    }
    if (destinosOverlay?.classList.contains("open")) {
      closeDestinosPanel();
    }
  });

  window.addEventListener("resize", () => {
    if (destinosOverlay?.classList.contains("open")) {
      updateOverlayPanelHeight();
    }
  });
}

function applyStaticTranslations() {
  Object.entries(staticTranslations).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.textContent = pickLang(value);
  });

  const exploreLabels = document.querySelectorAll(".explore-label");
  exploreLabels.forEach((label) => {
    label.textContent = currentLanguage === "es" ? "Explorar" : "Explore";
  });

  const mapCenterBtn = document.getElementById("mapCenterBtn");
  if (mapCenterBtn) mapCenterBtn.textContent = currentLanguage === "es" ? "Centrar" : "Center";

  const detailAddressLabel = document.querySelector(".detail-address span");
  if (detailAddressLabel) detailAddressLabel.textContent = currentLanguage === "es" ? "Dirección" : "Address";

  const destinoAddressLabel = document.querySelector(".destino-detail-address span");
  if (destinoAddressLabel) destinoAddressLabel.textContent = currentLanguage === "es" ? "Dirección" : "Address";

  const langToggleBtn = document.getElementById("langToggle");
  if (langToggleBtn) {
    langToggleBtn.setAttribute("aria-label", currentLanguage === "es" ? "Cambiar idioma" : "Change language");
  }
}

function applyLanguage(lang) {
  currentLanguage = lang;
  if (langCurrentFlag) langCurrentFlag.textContent = lang === "es" ? "🇪🇸" : "🇺🇸";
  if (langCurrentLabel) langCurrentLabel.textContent = lang === "es" ? "ES" : "EN";

  applyStaticTranslations();

  setupExperienceSection(sectionData.monumentos);
  setupExperienceSection(sectionData.hoteles);

  if (detailOverlay?.classList.contains("open") && activeDetailSectionKey) {
    openDetailPanel(activeDetailSectionKey);
  }

  if (destinosOverlay?.classList.contains("open")) {
    configureOverlayMode(activeOverlayMode);
    if (destinoDetailOverlay?.classList.contains("open")) {
      closeDestinoDetail();
    }
  }
}

function setupLanguageSwitcher() {
  if (!langSwitcher || !langToggle || !langMenu) return;

  langToggle.addEventListener("click", () => {
    langSwitcher.classList.toggle("open");
  });

  langMenu.querySelectorAll("button[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLang = button.getAttribute("data-lang");
      if (!nextLang) return;
      applyLanguage(nextLang);
      langSwitcher.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (!langSwitcher.contains(event.target)) {
      langSwitcher.classList.remove("open");
    }
  });
}

function setupLeafletMap() {
  const mapContainer = document.getElementById("map");
  const mapShell = document.querySelector(".map-shell");
  const centerBtn = document.getElementById("mapCenterBtn");
  if (!mapContainer || !mapShell || typeof window.L === "undefined") return;

  try {
    const defaultCoords = [4.3048, -74.8016];
    const defaultZoom = 13;
    const map = L.map(mapContainer, {
      zoomControl: true,
      attributionControl: true,
    }).setView(defaultCoords, defaultZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    L.marker(defaultCoords).addTo(map);

    if (centerBtn) {
      centerBtn.addEventListener("click", () => {
        map.setView(defaultCoords, defaultZoom, { animate: true });
      });
    }

    mapShell.classList.add("map-loaded");
    setTimeout(() => map.invalidateSize(), 120);
  } catch (error) {
    // Si Leaflet falla, se mantiene automaticamente el fallback visual.
  }
}

function updateLanguage(lang) {
    document.getElementById("creditosTitle").textContent = translations[lang].creditosTitle;
    document.getElementById("creditosText").textContent = translations[lang].creditosText;

    // aquí ya tienes los demás textos...
}

setupHeroCarousel();
setupExperienceSection(sectionData.monumentos);
setupExperienceSection(sectionData.hoteles);
setupLeafletMap();
setupExplorePanel();
setupDestinosExperience();
setupLanguageSwitcher();
applyLanguage("es");
