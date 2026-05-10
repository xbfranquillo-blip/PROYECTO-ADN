export interface AcademicEntry {
  id: string;
  name: string;
  category: 'Parasito' | 'Bacteria' | 'Virus' | 'Hongo' | 'Inmunidad';
  type: string;
  morphology?: string;
  habitat?: string;
  population?: string;
  clinical: string;
  diagnosis?: string;
  prevention?: string;
  mechanism?: string; // For Immunity entries
  hasSpecialViz?: string;
}

export const ACADEMIC_DATA: AcademicEntry[] = [
  // --- INMUNIDAD ---
  {
    id: "inmunidad-innata",
    name: "Inmunidad Innata",
    category: "Inmunidad",
    type: "Defensa No Específica",
    clinical: "Respuesta inmediata, presente desde el nacimiento. No genera memoria inmunológica significativa.",
    mechanism: "Reconocimiento de PAMPs/DAMPs vía PRRs (TLR, NLR, RLR). Activación de inflamación y fagocitosis.",
    morphology: "Sistema multicomponente integrado.",
    hasSpecialViz: "innate-recognition"
  },
  {
    id: "inmunidad-adaptativa",
    name: "Inmunidad Adaptativa",
    category: "Inmunidad",
    type: "Defensa Específica",
    clinical: "Respuesta tardía pero altamente específica. Genera memoria inmunológica.",
    mechanism: "Basada en Linfocitos T y B. Presentación de antígenos vía MHC. Polarización de CD4+ según citocinas.",
    morphology: "Red compleja de órganos linfoides y células circulantes.",
    hasSpecialViz: "t-polarization"
  },
  {
    id: "neutrofilos",
    name: "Neutrófilos",
    category: "Inmunidad",
    type: "Inmunidad Innata (Granulocitos)",
    clinical: "Primera línea de defensa celular contra bacterias extracelulares. Realizan fagocitosis y liberación de NETs.",
    mechanism: "Reconocimiento vía PAMPs -> Degranulación -> Estallido respiratorio.",
    morphology: "Células polimorfonucleares con gránulos citoplasmáticos finos."
  },
  {
    id: "macrofagos",
    name: "Macrófagos",
    category: "Inmunidad",
    type: "Células Presentadoras de Antígeno (APC)",
    clinical: "Fagocitosis de patógenos y restos celulares. Clave en la transición a la inmunidad adaptativa.",
    mechanism: "Fagocitosis activada por interferón gamma y PAMPs. Expresan MHC-II.",
    morphology: "Células grandes con núcleo arriñonado y abundante citoplasma con vacuolas."
  },
  {
    id: "linfocitos-t",
    name: "Linfocitos T",
    category: "Inmunidad",
    type: "Inmunidad Adaptativa (Celular)",
    clinical: "Coordina la respuesta inmune (CD4+) y destruye células infectadas/tumorales (CD8+).",
    mechanism: "Reconocimiento de péptidos en MHC vía TCR. Diferenciación en Th1, Th2, Th17, Treg.",
    morphology: "Mononucleares pequeños con núcleo denso y poco citoplasma."
  },
  {
    id: "linfocitos-b",
    name: "Linfocitos B",
    category: "Inmunidad",
    type: "Inmunidad Adaptativa (Humoral)",
    clinical: "Responsables de la producción de anticuerpos (Inmunoglobulinas). Diferenciación a células plasmáticas.",
    mechanism: "Activación BCR -> Expansión clonal -> Secreción de Ig (IgM, IgG, IgA, IgE, IgD).",
    morphology: "Células mononucleares pequeñas con escaso citoplasma."
  },
  {
    id: "mastocitos",
    name: "Mastocitos",
    category: "Inmunidad",
    type: "Células Granulocíticas Tisulares",
    clinical: "Clave en reacciones alérgicas y defensa contra helmintos. Liberación de histamina.",
    mechanism: "Degranulación mediada por IgE. Vasodilatación y aumento de permeabilidad.",
    morphology: "Grandes células repletas de gránulos basófilos que ocultan el núcleo."
  },
  {
    id: "eosinofilos",
    name: "Eosinófilos",
    category: "Inmunidad",
    type: "Granulocitos (Inmunidad Innata)",
    clinical: "Defensa principal contra parásitos helmintos. Participan en inflamación alérgica.",
    mechanism: "Liberación de proteína básica mayor (MBP) y proteína catiónica del eosinófilo (ECP).",
    morphology: "Núcleo bilobulado con gránulos grandes de color naranja-rojizo (eosina)."
  },
  {
    id: "basofilos",
    name: "Basófilos",
    category: "Inmunidad",
    type: "Granulocitos Circulantes",
    clinical: "Función similar a mastocitos pero en sangre. Participan en hipersensibilidad inmediata.",
    mechanism: "Liberación de histamina, heparina y leucotrienos tras activación por IgE.",
    morphology: "Núcleo en 'S' u oculto por gránulos grandes azul-violeta profundo."
  },
  {
    id: "hipersensibilidad",
    name: "Hipersensibilidad (Gell y Coombs)",
    category: "Inmunidad",
    type: "Respuesta Inmune Exagerada",
    clinical: "Daño tisular por respuesta excesiva. dividida en 4 tipos principales.",
    mechanism: "Tipo I: IgE (Alergia). Tipo II: Citotóxica (IgG/IgM). Tipo III: Inmunocomplejos. Tipo IV: Celular (Retardada).",
    morphology: "Desde edema e infiltrado eosinofílico hasta granulomas según el tipo."
  },
  {
    id: "inmunidad-mucosas",
    name: "Inmunidad de Mucosas (GALT)",
    category: "Inmunidad",
    type: "Defensa de Barrera",
    clinical: "Protección de superficies externas. Representa la mayor concentración de linfocitos del cuerpo.",
    mechanism: "Acción de IgA secretora, presencia de Células M y Placas de Peyer.",
    morphology: "Mucosa intestinal con vellosidades, enterocitos y células especializadas.",
    hasSpecialViz: "mucosal-immunity"
  },
  // --- VIRUS ---
  {
    id: "hiv",
    name: "VIH (Retrovirus)",
    category: "Virus",
    type: "Virus de ARN Monocatenario",
    clinical: "Infección de linfocitos T CD4+, llevando a inmunodeficiencia severa (SIDA).",
    morphology: "Esférico, envuelto, con glicoproteínas gp120 y gp41. Enzima transcriptasa inversa.",
    diagnosis: "ELISA (4ta gen), Carga viral (PCR), Western Blot.",
    prevention: "Uso de preservativos, profilaxis pre/post exposición (PrEP/PEP), control de hemoderivados."
  },
  {
    id: "hepatitis-b",
    name: "VHB (Hepadnavirus)",
    category: "Virus",
    type: "Virus de ADN Bicatenario con envoltura",
    clinical: "Hepatitis aguda o crónica, riesgo de cirrosis y carcinoma hepatocelular.",
    habitat: "Hígado (Hepatocitos).",
    diagnosis: "HBsAg (Antígeno de superficie), Anti-HBcAg.",
    prevention: "Vacunación, medidas de bioseguridad."
  },
  {
    id: "dengue",
    name: "Dengue (Flavivirus)",
    category: "Virus",
    type: "Virus de ARN Monocatenario (+)",
    clinical: "Fiebre rompehuesos, cefalea retroorbitaria, riesgo de dengue hemorrágico por reinfección (Efecto ADE).",
    habitat: "Transmisión por mosquito Aedes aegypti.",
    morphology: "Icosaédrico, envuelto, 4 serotipos diferentes (DENV 1-4).",
    diagnosis: "Antígeno NS1 (fase inicial), Serología IgM/IgG, PCR.",
    prevention: "Eliminación de criaderos, uso de repelentes, mosquiteros."
  },
  {
    id: "influenza",
    name: "Influenza (Ortomixovirus)",
    category: "Virus",
    type: "Virus de ARN Segmentado (-)",
    clinical: "Gripe estacional, fiebre alta, mialgias, riesgo de neumonía viral primaria o bacteriana secundaria.",
    habitat: "Epitelio respiratorio.",
    morphology: "Pleomórfico, envuelto, con Hemaglutinina (H) y Neuraminidasa (N).",
    diagnosis: "Pruebas rápidas de antígeno, RT-PCR (Hisopado nasofaríngeo).",
    prevention: "Vacunación anual, lavado de manos, etiqueta respiratoria."
  },
  {
    id: "hsv",
    name: "Herpes Simple (HSV 1 y 2)",
    category: "Virus",
    type: "Virus de ADN Bicatenario",
    clinical: "Lesiones vesiculares en racimo (labial o genital). Latencia en ganglios neuronales (trigémino o sacros).",
    habitat: "Epitelios y terminaciones nerviosas.",
    morphology: "Icosaédrico, envuelto con tegumento, familia Herpesviridae.",
    diagnosis: "Clínico, PCR de lesión, Citodiagnóstico de Tzanck (células multinucleadas).",
    prevention: "Uso de barrera en relaciones sexuales, evitar contacto con lesiones activas."
  },
  {
    id: "hpv",
    name: "VPH (Papilomavirus)",
    category: "Virus",
    type: "Virus de ADN Bicatenario circular",
    clinical: "Verrugas cutáneas, condilomas genitales. Tipos 16 y 18 vinculados a cáncer de cuello uterino.",
    habitat: "Queratinocitos de piel y mucosas.",
    morphology: "Icosaédrico pequeño, no envuelto.",
    diagnosis: "Papanicolaou (Pap), Colposcopia, Tipificación por PCR.",
    prevention: "Vacunación (Gardasil/Cervarix), uso de preservativos, tamizaje periódico."
  },
  {
    id: "rotavirus",
    name: "Rotavirus",
    category: "Virus",
    type: "Virus de ARN Bicatenario segmentado",
    clinical: "Causa #1 de diarrea grave deshidratante en lactantes y niños pequeños. Vómitos y fiebre.",
    habitat: "Enterocitos del intestino delgado.",
    morphology: "Forma de rueda (rota), sin envoltura, triple capa proteica.",
    diagnosis: "Detección de antígenos en heces (Aglutinación látex/ELISA).",
    prevention: "Vacunación oral, higiene de manos, lactancia materna."
  },
  // --- BACTERIAS ---
  {
    id: "staph-aureus",
    name: "Staphylococcus aureus",
    category: "Bacteria",
    type: "Cocos Gram positivos en racimo",
    clinical: "Foliculitis, forúnculos, neumonía, endocarditis, síndrome de shock tóxico.",
    morphology: "Cocos esféricos, catalasa y coagulasa positivos.",
    habitat: "Fosas nasales, piel (comensal).",
    diagnosis: "Cultivo (Agar sangre/Manitol), Tinción gram.",
    prevention: "Lavado de manos, desinfección de heridas."
  },
  {
    id: "strep-pyogenes",
    name: "Streptococcus pyogenes (Grupo A)",
    category: "Bacteria",
    type: "Cocos Gram positivos en cadenas",
    clinical: "Faringitis estreptocócica, escarlatina, erisipela, fiebre reumática, glomerulonefritis postestreptocócica.",
    morphology: "Cocos en cadenas, Beta-hemolítico, sensible a bacitracina.",
    habitat: "Orofaringe, piel.",
    diagnosis: "Pruebas rápidas de antígeno, Cultivo en agar sangre, Títulos de ASLO.",
    prevention: "Tratamiento precoz de faringitis, higiene cutánea."
  },
  {
    id: "strep-agalactiae",
    name: "Streptococcus agalactiae (Grupo B)",
    category: "Bacteria",
    type: "Cocos Gram positivos en cadenas",
    clinical: "Sepsis neonatal, meningitis neonatal, neumonía en el recién nacido. Infecciones en diabéticos.",
    morphology: "Beta-hemolítico (débil), prueba de CAMP positiva.",
    habitat: "Tracto genitourinario femenino, tracto gastrointestinal inferior.",
    diagnosis: "Cultivo, pruebas de PCR para detección prenatal.",
    prevention: "Tamizaje prenatal (35-37 semanas), quimioprofilaxis intraparto con penicilina."
  },
  {
    id: "mycobacterium-leprae",
    name: "Mycobacterium leprae",
    category: "Bacteria",
    type: "Bacilo Ácido-Alcohol Resistente (BAAR)",
    clinical: "Lepra (Enfermedad de Hansen): lepromatosa (difusa) o tuberculoide (localizada). Daño a nervios periféricos.",
    morphology: "Bacilo intracelular obligado, no cultivable in vitro. Pared rica en ácidos micólicos.",
    habitat: "Intracelular (Macrófagos, células de Schwann).",
    diagnosis: "Baciloscopia de linfa/mucosa nasal, Biopsia de nervio/piel, Prueba de lepromina.",
    prevention: "Detección temprana, tratamiento de contactos convivientes con multidrogaterapia (MDT)."
  },
  {
    id: "mycobacterium-tb",
    name: "Mycobacterium tuberculosis",
    category: "Bacteria",
    type: "Bacilo Ácido-Alcohol Resistente (BAAR)",
    clinical: "Tuberculosis pulmonar y extrapulmonar. Formación de granulomas.",
    habitat: "Intracelular (Macrófagos alveolares).",
    morphology: "Bacilo delgado, pared rica en ácidos micólicos.",
    diagnosis: "Baciloscopia (Ziehl-Neelsen), Cultivo (Lowenstein-Jensen), PCR (GeneXpert).",
    prevention: "Vacuna BCG, aislamiento de pacientes bacilíferos."
  },
  // --- HONGOS ---
  {
    id: "candida-albicans",
    name: "Candida albicans",
    category: "Hongo",
    type: "Hongo Dimórfico (Levadura/Pseudohifas)",
    clinical: "Candidiasis oral (muguet), vaginal, esofágica o sistémica en inmunocomprometidos.",
    habitat: "Mucosas, tracto digestivo (oportunista).",
    morphology: "Levaduras redondas que forman tubos germinales y pseudohifas.",
    diagnosis: "Examen directo con KOH, Cultivo en Agar Sabouraud.",
    prevention: "Control de glucemia, evitar uso excesivo de antibióticos."
  },
  {
    id: "malassezia-furfur",
    name: "Malassezia furfur",
    category: "Hongo",
    type: "Levadura Lipofílica (Micosis Superficial)",
    clinical: "Pitiriasis versicolor (máculas hipo o hiperpigmentadas). Foliculitis.",
    habitat: "Piel (estrato córneo), rica en glándulas sebáceas.",
    morphology: "Células levaduriformes en racimo y fragmentos de hifas (imagen en 'espagueti y albóndigas').",
    diagnosis: "Luz de Wood (fluorescencia amarillo-dorada), examen directo con KOH.",
    prevention: "Higiene personal, uso de agentes antifúngicos tópicos (ketoconazol)."
  },
  {
    id: "aspergillus-fumigatus",
    name: "Aspergillus fumigatus",
    category: "Hongo",
    type: "Hongo Filamentoso Oportunista",
    clinical: "Aspergilosis pulmonar invasiva, aspergiloma (bola fúngica), alergias.",
    habitat: "Suelo, materia orgánica en descomposición, aire.",
    morphology: "Hifas hialinas tabicadas con ramificación dicotómica en ángulo de 45°.",
    diagnosis: "Cultivo, Galactomanano en suero, Biopsia.",
    prevention: "Filtración de aire (filtros HEPA) en hospitales, evitar obras cerca de inmunocomprometidos."
  },
  {
    id: "cryptococcus-neoformans",
    name: "Cryptococcus neoformans",
    category: "Hongo",
    type: "Levadura Encapsulada Oportunista",
    clinical: "Meningitis criptocócica en pacientes con SIDA. Infección pulmonar.",
    habitat: "Suelo contaminado con excremento de palomas.",
    morphology: "Levadura redonda con cápsula prominente de polisacáridos.",
    diagnosis: "Tinta china (visualiza cápsula), Aglutinación de látex para antígeno capsular.",
    prevention: "Control de poblaciones de aves, profilaxis en pacientes con CD4 muy bajo."
  },
  {
    id: "pneumocystis-jirovecii",
    name: "Pneumocystis jirovecii",
    category: "Hongo",
    type: "Hongo Atípico Oportunista",
    clinical: "Neumonía intersticial (PCP) característica en pacientes con VIH/SIDA.",
    habitat: "Pulmones (trofismo alveolar).",
    morphology: "Formas quísticas de pared gruesa (forma de casco o copa) y trofozoítos.",
    diagnosis: "Tinción de Gomori-Grocott (sales de plata), Inmunofluorescencia directa.",
    prevention: "Profilaxis con TMP-SMX en pacientes inmunocomprometidos."
  },
  // --- PARASITOS (Originales + mejorados) ---
  {
    id: "giardia",
    name: "Giardia lamblia",
    category: "Parasito",
    type: "Protozoo Flagelado (Monoxénico)",
    morphology: "Trofozoíto piriforme con 2 núcleos y disco suctor. Quiste ovalado con 4 núcleos.",
    habitat: "Intestino delgado (duodeno y yeyuno).",
    population: "Principalmente niños, viajeros e inmunocomprometidos.",
    clinical: "Diarrea esteatorreica, malabsorción, dolor abdominal.",
    diagnosis: "EPSD, Coproantígenos (ELISA).",
    prevention: "Agua potable, lavado de manos, higiene de alimentos."
  },
  {
    id: "entamoeba",
    name: "Entamoeba histolytica",
    category: "Parasito",
    type: "Protozoo Ameba (Monoxénico)",
    morphology: "Trofozoíto con eritrocitos fagocitados. Quiste tetranucleado.",
    habitat: "Intestino grueso (ciego, colon). Invasivo.",
    population: "Zonas tropicales con saneamiento deficiente.",
    clinical: "Disentería amebiana (moco/sangre), absceso hepático.",
    diagnosis: "EPSD, Coproantígenos, Serología (hepática).",
    prevention: "Saneamiento ambiental, agua segura."
  },
  {
    id: "enterobius",
    name: "Enterobius vermicularis",
    category: "Parasito",
    type: "Nematodo (Oxiuro)",
    habitat: "Ciego y colon ascendente. Hembras migran a perianal.",
    morphology: "Adulto pequeño (~1cm). Huevo asimétrico en 'D'.",
    population: "Niños en edad escolar y grupos familiares.",
    clinical: "Prurito anal nocturno, irritabilidad, insomnio.",
    diagnosis: "Test de Graham.",
    prevention: "Uñas cortas, lavado de ropa, tratamiento familiar."
  },
  {
    id: "ascaris",
    name: "Ascaris lumbricoides",
    category: "Parasito",
    type: "Nematodo (Geohelminto)",
    habitat: "Intestino delgado (yeyuno).",
    morphology: "Nematodo grande (hasta 40cm). Huevo mamelonado.",
    population: "Niños en zonas rurales con geofagia.",
    clinical: "Síndrome de Löffler (pulmonar), obstrucción intestinal.",
    diagnosis: "EPSD (huevos mamelonados).",
    prevention: "Eliminación de excretas, lavado de vegetales."
  },
  {
    id: "trichuris",
    name: "Trichuris trichiura",
    category: "Parasito",
    type: "Nematodo (Gusano látigo)",
    habitat: "Intestino grueso.",
    morphology: "Forma de látigo. Huevo en forma de barril.",
    population: "Zonas tropicales, niños.",
    clinical: "Disentería, pujo, tenesmo, prolapso rectal.",
    diagnosis: "EPSD (huevos con tapones polares).",
    prevention: "Higiene personal, saneamiento."
  },
  {
    id: "trypanosoma-cruzi",
    name: "Trypanosoma cruzi (Chagas)",
    category: "Parasito",
    type: "Protozoo Flagelado (Hemoflagelado)",
    morphology: "Tripomastigote (sangre), Amastigote (tejido intracelular), Epimastigote (insecto).",
    habitat: "Sangre y tejidos (corazón, esófago, colon).",
    population: "Zonas rurales de América Latina, habitantes de viviendas de adobe.",
    clinical: "Fase aguda (Signo de Romaña), Fase crónica (Cardiomegalia, Megaesófago, Megacolon).",
    diagnosis: "Gota gruesa (fase aguda), Serología ELISA/IFI (fase crónica), Xenodiagnóstico.",
    prevention: "Control del vector (Vinchuca), mejora de vivienda, tamizaje en bancos de sangre."
  },
  {
    id: "plasmodium-falciparum",
    name: "Plasmodium falciparum (Malaria)",
    category: "Parasito",
    type: "Protozoo Apicomplexa",
    morphology: "Trofozoíto en anillo, Esquizonte, Gametocito en forma de banana/semiluna.",
    habitat: "Eritrocitos y Hepatocitos.",
    population: "Viajeros y residentes de zonas tropicales (África, Amazonía).",
    clinical: "Fiebre terciana maligna, anemia hemolítica, malaria cerebral, esplenomegalia.",
    diagnosis: "Gota gruesa y extendido periférico (Gold standard), Pruebas rápidas de antígeno.",
    prevention: "Uso de mosquiteros, repelentes, control del mosquito Anopheles, quimioprofilaxis."
  },
  {
    id: "leishmania-spp",
    name: "Leishmania spp.",
    category: "Parasito",
    type: "Protozoo Hemoflagelado",
    morphology: "Amastigote (intracelular en macrófagos del huésped), Promastigote (en el vector).",
    habitat: "Macrófagos de piel, mucosas o vísceras.",
    population: "Zonas rurales y selváticas, trabajadores agrícolas.",
    clinical: "Leishmaniasis cutánea (úlcera de los chicleros), mucocutánea (espundia) o visceral (Kala-azar).",
    diagnosis: "Frotis de lesión, Prueba de Montenegro (hipersensibilidad tardía), Biopsia.",
    prevention: "Control del mosquito flebótomo (Lutzomyia), uso de ropa protectora."
  },
  {
    id: "toxoplasma-gondii",
    name: "Toxoplasma gondii",
    category: "Parasito",
    type: "Protozoo Apicomplexa (Heteroxénico)",
    morphology: "Taquizoíto (forma proliferativa), Bradizoíto (en quistes tisulares), Ooquiste (en heces de gato).",
    habitat: "Cualquier célula nucleada (especialmente SNC y ojo).",
    population: "Embarazadas (riesgo congénito), pacientes con VIH/SIDA.",
    clinical: "Linfadenopatía, Toxoplasmosis congénita (tríada de Sabin), Coriorretinitis, encefalitis.",
    diagnosis: "Serología (IgM/IgG), Avidez de IgG, PCR en líquido amniótico.",
    prevention: "Consumo de carne bien cocida, lavado de manos tras contacto con gatos o tierra."
  },
  {
    id: "taenia-spp",
    name: "Taenia solium / saginata",
    category: "Parasito",
    type: "Platelminto (Céstodo)",
    morphology: "Escólex con ganchos (solium) o sin ellos (saginata). Proglótides grávidas. Huevo radiado.",
    habitat: "Intestino delgado (adulto). Tejidos (larva/cisticerco).",
    population: "Personas que consumen carne de cerdo o res cruda o mal cocida.",
    clinical: "Teniasis (asintomática o dolor abdominal). Neurocisticercosis (convulsiones) por T. solium.",
    diagnosis: "Coproparasitológico (huevos/proglótides), ELISA/Western Blot, Neuroimagen (TAC/RMN).",
    prevention: "Cocción adecuada de carnes, inspección veterinaria, lavado de manos."
  }
];

