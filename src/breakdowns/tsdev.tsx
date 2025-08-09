import type { TemplateBreakdown } from '../types/breakdown';
import { 
  createText, 
  createMath, 
  createCode, 
  createList, 
  createSection,
  createImage
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
    
    createSection('intro', 'Introduction', [
      
      createText('We built TSDev to analyze my friend\'s gambling habits, where the underlying data consisted of long, irregular, and noisy time series. Limitations in traditional time series analysis don\'t allow for direct comparison of irregular sequences, which is computationally expensive and often unstable. Many machine learning models are not suited for sequential data. By vectorizing time series into embeddings, TSDev addresses these challenges and enables the use of clustering, classification, and anomaly detection.'),
      createText('Discrete Connections refer to the relationships between time series after being transformed into vector embeddings. Instead of comparing raw sequences, we evaluate a compact representation using distance metrics, similarity graphs, and machine learning algorithms.'),
      createText('TSDev addresses these challenges through a two-step process. First, we apply our "Flowing Window Algorithm" to “vectorize” the raw data into high-dimensional tensor summaries. This transforms unpredictable, non-linear time series into structured embeddings that are far easier to store, query, and analyze. These embeddings can be saved locally or in vector databases such as Pinecone or Weaviate.'),
    ]),
    
    createSection('vectorizer', 'Vectorization Engine', [
      createText('Our vectorizer engine works in two steps: we start by applying the Flowing Window algorithm, then compile a tensor embedding, and then store the embedding in a vector database.'),
      createImage('/vectorizer.png', 'TSDev System Architecture Diagram'),
      createMath('\\text{Given a time series } S \\in \\mathbb{T}, \\text{Select window size} w \\in \\mathbb{N}'),
      createMath('w \\in \\mathbb{N}, \\quad w < n'),
      createMath('\\text{Form overlapping windows } x_i^{(w)} = (x_i, x_{i+1}, \\ldots, x_{i+w-1}) \\in \\mathbb{R}^w, \\quad i = 1, \\ldots, n-w+1'),
      createMath('\\text{Compute summary statistics on each window: } \\mu_i = \\frac{1}{w} \\sum_{j=0}^{w-1} x_{i+j}, \\quad \\sigma_i^2 = \\frac{1}{w} \\sum_{j=0}^{w-1} (x_{i+j} - \\mu_i)^2'),
      createMath('\\text{Compute the Fast Fourier Transform (FFT) of each window: } \\hat{x}_i = \\mathrm{FFT}(x_i^{(w)}) \\in \\mathbb{C}^w'),
      createMath('\\text{Extract relevant frequency components from } \\hat{x}_i, \\text{ e.g. magnitude spectrum } |\\hat{x}_i|'),
      createMath('\\text{Construct the final feature tensor } T \\in \\mathbb{R}^{(n-w+1) \\times m}, \\text{ where each row } T_i \\text{ concatenates statistics and FFT features}'),
      createMath('T_i = [\\mu_i, \\sigma_i^2, |\\hat{x}_i^{(1)}|, |\\hat{x}_i^{(2)}|, \\ldots, |\\hat{x}_i^{(m-2)}|]'),
      createMath('\\text{This tensor summarizes time, frequency, and statistical features across the signal}')
    ]),

    createSection('deep_learning', 'Deep Learning', [
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
        
        return embeddings`, 'python', 'core_pipeline.py')
    ]),
    
    createSection('resolution', 'Resolution', [])
  ]
});

export default TSDevTemplateBreakdown;