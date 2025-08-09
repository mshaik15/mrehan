import type { TemplateBreakdown } from '../types/breakdown';
import { 
  createText, 
  createMath, 
  createCode, 
  createList, 
  createMetrics,
  createSection,
  createImage,
  createQuote
} from '../utils/breakdownTemplateCreator';

const TSDevTemplateBreakdown = (): TemplateBreakdown => ({
  metadata: {
    title: 'TSDev',
    subtitle: 'Optimized Vectorization of Time Series Data for Machine Learning',
    projectType: 'Research',
    year: '2025',
    timeline: '2 months · June - Aug 2025',
    tools: ['PyTorch', 'FAISS', 'NumPy', 'Matplotlib', 'Mathematical Modeling'],
    team: [
      { 
        name: 'Mohammed Rehan', 
        linkedinUrl: 'https://www.linkedin.com/in/mrs15/' 
      },
      {
        name: 'Zayn',
        linkedinUrl: 'https://www.linkedin.com/in/zayn-bhatti-393327318/'
      },
      {
        name: 'Jeremiah',
      },
      {
        name: 'Dev',
        linkedinUrl: 'https://www.linkedin.com/in/devanand-vinod-06a075330/'
      }
    ],
    role: 'Developer',
    status: 'Completed',
    githubUrl: 'https://github.com/mshaik15/TsDev',
    previewImage: '../TSDev.jpg'
  },
  
  sections: [
    createSection('overview', 'Overview', [
      createText('TSDev is a framework for applying machine learning and computational methods to time series by vectorization, enabling the discovery of discrete connections between series and sequences. Our goal was to prove our friend was good at sports betting by summarizing long, noisy, and nonlinear time series data into vector embeddings suitable for a variety of machine learning algorithms.'),
      createText('This pipeline supports techniques such as clustering, classification, and similarity analysis, which are challenging to perform directly on raw time series.'),
      createText('This project is applicable for any vectorization tasks, but we mainly test gambling and irresponsible means of making money!')
    ]),
    
    createSection('problem', 'Problem & Motivation', [
      createText('We built TSDev to analyze my friend\'s gambling habits, where the underlying data consisted of long, irregular, and noisy time series. Limitations in traditional time series analysis don\'t allow for direct comparison of irregular sequences, which is computationally expensive and often unstable.'),
      createText('Many machine learning models are not suited for sequential data. By vectorizing time series into embeddings, TSDev addresses these challenges and enables the use of clustering, classification, and anomaly detection.'),
      createQuote('Discrete Connections refer to the relationships between time series after being transformed into vector embeddings. Instead of comparing raw sequences, we evaluate a compact representation using distance metrics, similarity graphs, and machine learning algorithms.', 'Project Definition'),
      createText('Traditional approaches face several key challenges:'),
      createList([
        'Computational expense of comparing variable-length sequences',
        'Inability to handle irregular sampling rates',
        'Difficulty in capturing both temporal and frequency domain features',
        'Limited scalability for large datasets'
      ])
    ]),
    
    createSection('vectorizer', 'Vectorization Engine', [
      createText('TSDev addresses these challenges through a two-step process. First, we apply our "Flowing Window Algorithm" to "vectorize" the raw data into high-dimensional tensor summaries. This transforms unpredictable, non-linear time series into structured embeddings that are far easier to store, query, and analyze.'),
      createImage('/vectorizer.png', 'TSDev System Architecture Diagram'),
      createText('The mathematical foundation of our vectorization process follows this sequence:'),
      createMath('f: \\mathbb{R}^n \\to \\mathbb{R}^d \\quad \\text{where } n \\gg d'),
      createMath('\\text{Given input vector } x = (x_1, x_2, \\ldots, x_n) \\in \\mathbb{R}^n'),
      createMath('\\text{Select window size } w \\in \\mathbb{N}, \\quad w < n'),
      createMath('\\text{Form overlapping windows } x_i^{(w)} = (x_i, x_{i+1}, \\ldots, x_{i+w-1}) \\in \\mathbb{R}^w, \\quad i = 1, \\ldots, n-w+1'),
      createMath('\\text{Compute summary statistics on each window: } \\mu_i = \\frac{1}{w} \\sum_{j=0}^{w-1} x_{i+j}, \\quad \\sigma_i^2 = \\frac{1}{w} \\sum_{j=0}^{w-1} (x_{i+j} - \\mu_i)^2'),
      createMath('\\text{Compute the Fast Fourier Transform (FFT) of each window: } \\hat{x}_i = \\mathrm{FFT}(x_i^{(w)}) \\in \\mathbb{C}^w'),
      createMath('\\text{Extract relevant frequency components from } \\hat{x}_i, \\text{ e.g. magnitude spectrum } |\\hat{x}_i|'),
      createMath('\\text{Construct the final feature tensor } T \\in \\mathbb{R}^{(n-w+1) \\times m}, \\text{ where each row } T_i \\text{ concatenates statistics and FFT features}'),
      createMath('T_i = [\\mu_i, \\sigma_i^2, |\\hat{x}_i^{(1)}|, |\\hat{x}_i^{(2)}|, \\ldots, |\\hat{x}_i^{(m-2)}|]'),
      createMath('\\text{This tensor summarizes time, frequency, and statistical features across the signal}')
    ]),

    createSection('technical', 'Technical Implementation', [
      createText('The TSDev framework consists of several key components working together to transform time series data into meaningful vector representations:'),
      createList([
        'Feature Window Aggregation (FWA) for temporal pattern extraction',
        'Tensor Processing Pipeline for efficient computation',
        'KNN-based similarity matching with FAISS optimization',
        'Machine Learning model for classification and clustering'
      ]),
      createCode(`class TSDevPipeline:
    def __init__(self, window_size=100, embedding_dim=128):
        self.window_size = window_size
        self.embedding_dim = embedding_dim
        self.encoder = TimeSeriesEncoder(embedding_dim)
        self.faiss_index = faiss.IndexFlatL2(embedding_dim)
    
    def vectorize_series(self, time_series):
        # Apply Feature Window Aggregation
        windows = self.create_windows(time_series, self.window_size)
        
        # Generate embeddings
        embeddings = self.encoder.encode(windows)
        
        # Add to FAISS index for fast similarity search
        self.faiss_index.add(embeddings)
        
        return embeddings`, 'python', 'core_pipeline.py'),
      createText('The Flowing Window Algorithm works by sliding an overlapping window of length W across the original series S of length T, with a step size s. For each window N, we calculate a statistical vector containing temporal and frequency domain features.'),
      createText('Once vector embeddings are created, they are stored locally or in cloud-based vector databases such as Pinecone or Weaviate. This structure allows for millisecond-level retrieval, enabling rapid querying, similarity search, and cross-series comparisons even at scale.')
    ]),
    
    createSection('machine_learning', 'Machine Learning Pipeline', [
      createText('After vectorization, TSDev transitions from data representation to intelligent inference. Using the Facebook AI Similarity Search (FAISS) library, embeddings are projected into a high-dimensional metric space where proximity reflects underlying temporal dynamics rather than superficial alignment.'),
      createText('This enables precise similarity mapping even between sequences with drastically different lengths, missing intervals, or irregular sampling rates.'),
      createText('From here, we employ a hybrid machine learning architecture:'),
      createList([
        'Pre-Clustering Phase – Density-based clustering algorithms, such as HDBSCAN, are used to identify latent structural groupings in the embedding space',
        'Meta-Feature Extraction – Each cluster is distilled into meta-features (e.g., intra-cluster variance, centroid frequency-domain profile, entropy measures)',
        'Predictive Layer – Gradient-boosted ensembles and temporal convolutional networks (TCNs) operate on the meta-features to generate classification outputs',
        'Active Learning Loop – Model outputs are ranked by uncertainty, and the highest-uncertainty cases are fed back for manual review'
      ]),
      createText('This pipeline transforms static historical data into a living, adaptive model that does not merely learn correlations but evolves to anticipate emergent patterns—whether in gambling activity, financial markets, or IoT telemetry streams.')
    ]),
    
    createSection('results', 'Results & Analysis', [
      createText('Our framework successfully demonstrated its effectiveness across multiple time series analysis tasks. The vectorization approach achieved significant improvements in both computational efficiency and analysis accuracy compared to traditional methods.'),
      createMetrics([
        {
          label: 'Vectorization Speed',
          value: '150ms',
          description: 'Average processing time per series'
        },
        {
          label: 'Traditional Methods', 
          value: '2.3s',
          description: 'Baseline comparison time'
        },
        {
          label: 'Similarity Accuracy',
          value: '94%',
          description: 'Correct pattern matching'
        },
        {
          label: 'Storage Reduction',
          value: '85%',
          description: 'Compression ratio achieved'
        }
      ], 'Performance Metrics'),
      createText('The framework proved particularly effective for gambling pattern analysis, successfully identifying winning streaks, loss patterns, and betting behavior clusters that were previously difficult to detect in raw time series data.'),
      createText('Cross-validation results showed consistent performance across different types of time series data, from financial markets to sensor readings, demonstrating the generalizability of our approach.')
    ]),
    
    createSection('learned', 'What I Learned', [
      createText('This project provided deep insights into the intersection of signal processing, machine learning, and practical data science applications. Key learnings included the importance of feature engineering in time series analysis and the power of dimensionality reduction techniques.'),
      createList([
        'Advanced time series analysis and signal processing techniques',
        'FAISS optimization for large-scale similarity search', 
        'Mathematical modeling of temporal relationships',
        'Collaborative development and research methodology',
        'Performance optimization for real-time data processing'
      ]),
      createText('Working with a team of four developers taught me valuable lessons about code collaboration, project management, and the importance of clear documentation in research projects.')
    ]),
    
    createSection('conclusion', 'Conclusion / Impact', [
      createText('The TSDev project successfully demonstrates that intelligent vectorization can unlock new possibilities for time series analysis. By transforming sequential data into compact, meaningful representations, we enable traditional machine learning algorithms to work effectively with temporal data.'),
      createText('Our approach has applications beyond gambling analysis, including financial market prediction, IoT sensor data analysis, and any domain where temporal patterns need to be discovered and compared efficiently.'),
      createText('Future work will explore real-time streaming implementations and extension to multivariate time series with complex interdependencies.'),
      createMath('\\text{Project Impact} = \\text{Efficiency Gain} \\times \\text{Analysis Quality} \\times \\text{Scalability}')
    ])
  ]
});

export default TSDevTemplateBreakdown;