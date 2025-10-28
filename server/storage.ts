import { 
  type Topic, type InsertTopic,
  type Formula, type InsertFormula,
  type Exercise, type InsertExercise,
  type Comment, type InsertComment,
  type Rating, type InsertRating
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTopics(): Promise<Topic[]>;
  getTopic(id: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  getFormulas(): Promise<Formula[]>;
  getFormula(id: string): Promise<Formula | undefined>;
  getFormulasByTopic(topicId: string): Promise<Formula[]>;
  createFormula(formula: InsertFormula): Promise<Formula>;
  updateFormulaRating(id: string, avgRating: number, count: number): Promise<void>;
  
  getExercises(): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  getExercisesByTopic(topicId: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExerciseRating(id: string, avgRating: number, count: number): Promise<void>;
  
  getComments(targetType: string, targetId: string): Promise<Comment[]>;
  getComment(id: string): Promise<Comment | undefined>;
  createComment(comment: InsertComment): Promise<Comment>;
  updateCommentVotes(id: string, upvotes: number, downvotes: number): Promise<void>;
  
  getRatings(targetType: string, targetId: string): Promise<Rating[]>;
  getRating(userId: string, targetType: string, targetId: string): Promise<Rating | undefined>;
  createRating(rating: InsertRating): Promise<Rating>;
}

export class MemStorage implements IStorage {
  private topics: Map<string, Topic>;
  private formulas: Map<string, Formula>;
  private exercises: Map<string, Exercise>;
  private comments: Map<string, Comment>;
  private ratings: Map<string, Rating>;

  constructor() {
    this.topics = new Map();
    this.formulas = new Map();
    this.exercises = new Map();
    this.comments = new Map();
    this.ratings = new Map();
    this.seedData();
  }

  private seedData() {
    const topics: InsertTopic[] = [
      {
        name: 'Estructura Cristalina',
        description: 'Estudio de la disposición periódica de átomos en sólidos cristalinos, redes de Bravais y sistemas cristalinos.',
        icon: 'crystal-structure'
      },
      {
        name: 'Teoría de Bandas',
        description: 'Análisis de la estructura electrónica de sólidos, bandas de energía permitidas y prohibidas.',
        icon: 'band-theory'
      },
      {
        name: 'Semiconductores',
        description: 'Propiedades y aplicaciones de semiconductores, dopaje, y dispositivos electrónicos.',
        icon: 'semiconductors'
      },
      {
        name: 'Superconductividad',
        description: 'Fenómeno de resistencia eléctrica nula y expulsión de campos magnéticos en materiales superconductores.',
        icon: 'superconductivity'
      },
      {
        name: 'Mecánica Cuántica del Estado Sólido',
        description: 'Aplicación de principios cuánticos al estudio de propiedades de materiales sólidos.',
        icon: 'quantum-mechanics'
      },
    ];

    topics.forEach(topic => {
      const id = randomUUID();
      this.topics.set(id, { ...topic, id });
    });

    const topicIds = Array.from(this.topics.keys());
    
    const formulas: InsertFormula[] = [
      {
        name: 'Ley de Bragg',
        latex: '2d\\sin\\theta = n\\lambda',
        description: 'Describe la condición para la difracción constructiva de rayos X en cristales.',
        derivation: 'La ley de Bragg se deriva considerando que la diferencia de camino óptico entre rayos reflejados en planos sucesivos debe ser un múltiplo entero de la longitud de onda para interferencia constructiva.',
        applications: 'Determinación de estructuras cristalinas mediante difracción de rayos X, análisis de materiales cristalinos.',
        topicId: topicIds[0],
        difficulty: 1,
        averageRating: 4,
        ratingCount: 15
      },
      {
        name: 'Vector de Red Recíproca',
        latex: '\\vec{G} = h\\vec{b}_1 + k\\vec{b}_2 + l\\vec{b}_3',
        description: 'Define vectores en el espacio recíproco utilizados en la descripción de redes cristalinas.',
        derivation: 'Los vectores de la red recíproca se definen de manera que satisfagan la relación de ortogonalidad con los vectores de la red directa.',
        applications: 'Análisis de difracción, teoría de bandas, descripción de estructuras cristalinas.',
        topicId: topicIds[0],
        difficulty: 3,
        averageRating: 5,
        ratingCount: 8
      },
      {
        name: 'Relación de Dispersión de Electrones Libres',
        latex: 'E(k) = \\frac{\\hbar^2 k^2}{2m}',
        description: 'Energía de electrones libres en función del vector de onda en el modelo de electrones libres.',
        derivation: 'Se obtiene resolviendo la ecuación de Schrödinger para una partícula libre en una caja.',
        applications: 'Modelo básico para entender el comportamiento de electrones en metales.',
        topicId: topicIds[1],
        difficulty: 2,
        averageRating: 4,
        ratingCount: 12
      },
      {
        name: 'Ecuación de Kronig-Penney',
        latex: 'P\\frac{\\sin(Ka)}{Ka} + \\cos(Ka) = \\cos(ka)',
        description: 'Modelo unidimensional que describe el movimiento de electrones en un potencial periódico.',
        derivation: 'Solución de la ecuación de Schrödinger con un potencial periódico de pozos cuadrados.',
        applications: 'Entendimiento fundamental de la formación de bandas de energía en sólidos cristalinos.',
        topicId: topicIds[1],
        difficulty: 4,
        averageRating: 3,
        ratingCount: 6
      },
      {
        name: 'Concentración de Portadores Intrínsecos',
        latex: 'n_i = \\sqrt{N_c N_v} e^{-E_g/2k_BT}',
        description: 'Concentración de portadores de carga en un semiconductor intrínseco en equilibrio térmico.',
        derivation: 'Se obtiene de la condición de equilibrio entre la generación térmica y la recombinación de portadores.',
        applications: 'Cálculo de propiedades eléctricas de semiconductores, diseño de dispositivos.',
        topicId: topicIds[2],
        difficulty: 2,
        averageRating: 5,
        ratingCount: 20
      },
      {
        name: 'Ecuaciones de London',
        latex: '\\frac{\\partial \\vec{j}_s}{\\partial t} = \\frac{n_s e^2}{m}\\vec{E}',
        description: 'Describen el comportamiento electromagnético de superconductores, incluyendo el efecto Meissner.',
        derivation: 'Basadas en el modelo fenomenológico de London para el comportamiento de electrones superconductores.',
        applications: 'Explicación del efecto Meissner, cálculo de longitud de penetración en superconductores.',
        topicId: topicIds[3],
        difficulty: 4,
        averageRating: 4,
        ratingCount: 7
      },
    ];

    formulas.forEach(formula => {
      const id = randomUUID();
      this.formulas.set(id, { ...formula, id });
    });

    const exercises: InsertExercise[] = [
      {
        title: 'Cálculo de Distancia Interplanar',
        problemStatement: 'Un cristal cúbico simple tiene una constante de red a = 3.5 Å. Calcule la distancia entre planos (110) utilizando la relación geométrica apropiada.',
        solution: 'd_{110} = a/√(h² + k² + l²) = 3.5/√(1² + 1² + 0²) = 3.5/√2 = 2.475 Å',
        explanation: 'Para un sistema cúbico, la distancia interplanar se calcula usando la fórmula d = a/√(h² + k² + l²), donde (hkl) son los índices de Miller.',
        topicId: topicIds[0],
        difficulty: 1,
        averageRating: 5,
        ratingCount: 25
      },
      {
        title: 'Difracción de Rayos X',
        problemStatement: 'Se utiliza radiación Cu Kα (λ = 1.54 Å) para estudiar un cristal con espaciado d = 2.5 Å. ¿A qué ángulo se observará el primer orden de difracción?',
        solution: 'Usando la ley de Bragg: 2d sin θ = nλ, para n=1: sin θ = λ/(2d) = 1.54/(2×2.5) = 0.308, θ = arcsin(0.308) = 17.9°',
        explanation: 'La ley de Bragg relaciona el ángulo de difracción con el espaciado interplanar y la longitud de onda de la radiación incidente.',
        topicId: topicIds[0],
        difficulty: 2,
        averageRating: 4,
        ratingCount: 18
      },
      {
        title: 'Densidad de Estados en 3D',
        problemStatement: 'Demuestre que la densidad de estados para electrones libres en 3D es proporcional a √E.',
        solution: 'g(E) = (2m)^(3/2) V/(2π²ℏ³) × √E. La derivación parte de contar estados en el espacio k y relacionarlos con la energía E = ℏ²k²/(2m).',
        explanation: 'La densidad de estados es fundamental para calcular propiedades térmicas y de transporte en metales.',
        topicId: topicIds[1],
        difficulty: 3,
        averageRating: 3,
        ratingCount: 10
      },
      {
        title: 'Concentración de Portadores en Silicio',
        problemStatement: 'Calcule la concentración intrínseca de portadores en silicio a 300 K, dado que Eg = 1.12 eV, Nc = 2.8×10¹⁹ cm⁻³, Nv = 1.04×10¹⁹ cm⁻³.',
        solution: 'ni = √(Nc × Nv) × exp(-Eg/(2kBT)) = √(2.8×10¹⁹ × 1.04×10¹⁹) × exp(-1.12/(2×0.0259)) = 1.0×10¹⁰ cm⁻³',
        explanation: 'Esta concentración intrínseca es crucial para entender el dopaje y las propiedades eléctricas de semiconductores.',
        topicId: topicIds[2],
        difficulty: 2,
        averageRating: 5,
        ratingCount: 22
      },
    ];

    exercises.forEach(exercise => {
      const id = randomUUID();
      this.exercises.set(id, { ...exercise, id });
    });
  }

  async getTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values());
  }

  async getTopic(id: string): Promise<Topic | undefined> {
    return this.topics.get(id);
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = randomUUID();
    const topic: Topic = { ...insertTopic, id };
    this.topics.set(id, topic);
    return topic;
  }

  async getFormulas(): Promise<Formula[]> {
    return Array.from(this.formulas.values());
  }

  async getFormula(id: string): Promise<Formula | undefined> {
    return this.formulas.get(id);
  }

  async getFormulasByTopic(topicId: string): Promise<Formula[]> {
    return Array.from(this.formulas.values()).filter(f => f.topicId === topicId);
  }

  async createFormula(insertFormula: InsertFormula): Promise<Formula> {
    const id = randomUUID();
    const formula: Formula = { 
      ...insertFormula, 
      id, 
      averageRating: 0, 
      ratingCount: 0 
    };
    this.formulas.set(id, formula);
    return formula;
  }

  async updateFormulaRating(id: string, avgRating: number, count: number): Promise<void> {
    const formula = this.formulas.get(id);
    if (formula) {
      formula.averageRating = avgRating;
      formula.ratingCount = count;
      this.formulas.set(id, formula);
    }
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByTopic(topicId: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(e => e.topicId === topicId);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { 
      ...insertExercise, 
      id, 
      averageRating: 0, 
      ratingCount: 0 
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async updateExerciseRating(id: string, avgRating: number, count: number): Promise<void> {
    const exercise = this.exercises.get(id);
    if (exercise) {
      exercise.averageRating = avgRating;
      exercise.ratingCount = count;
      this.exercises.set(id, exercise);
    }
  }

  async getComments(targetType: string, targetId: string): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      c => c.targetType === targetType && c.targetId === targetId
    );
  }

  async getComment(id: string): Promise<Comment | undefined> {
    return this.comments.get(id);
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { 
      ...insertComment, 
      id, 
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date()
    };
    this.comments.set(id, comment);
    return comment;
  }

  async updateCommentVotes(id: string, upvotes: number, downvotes: number): Promise<void> {
    const comment = this.comments.get(id);
    if (comment) {
      comment.upvotes = upvotes;
      comment.downvotes = downvotes;
      this.comments.set(id, comment);
    }
  }

  async getRatings(targetType: string, targetId: string): Promise<Rating[]> {
    return Array.from(this.ratings.values()).filter(
      r => r.targetType === targetType && r.targetId === targetId
    );
  }

  async getRating(userId: string, targetType: string, targetId: string): Promise<Rating | undefined> {
    return Array.from(this.ratings.values()).find(
      r => r.userId === userId && r.targetType === targetType && r.targetId === targetId
    );
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    const existing = await this.getRating(insertRating.userId, insertRating.targetType, insertRating.targetId);
    if (existing) {
      existing.rating = insertRating.rating;
      this.ratings.set(existing.id, existing);
      return existing;
    }
    const id = randomUUID();
    const rating: Rating = { ...insertRating, id };
    this.ratings.set(id, rating);
    return rating;
  }
}

export const storage = new MemStorage();
