import type { TemplateBreakdown } from '../types/breakdown';

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
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'text',
          content: 'TSDev is a framework for applying machine learning and computational methods to time series by vectorization, enabling the discovery of discrete connections between series and sequences. Our goal was to prove our friend was good at sports betting by summarizing long, noisy, and nonlinear time series data into vector embeddings suitable for a variety of machine learning algorithms.'
        },
        {
          type: 'text',
          content: 'This pipeline supports techniques such as clustering, classification, and similarity analysis, which are challenging to perform directly on raw time series.'
        },
        {
          type: 'text',
          content: 'This project is applicable for any vectorization tasks, but we mainly test gambling and irresponsible means of making money!'
        }
      ]
    },
    
    {
      id: 'problem',
      title: 'Problem & Definition',
      blocks: [
        {
          type: 'text',
          content: 'We built TSDev to analyze my friend\'s gambling habits, where the underlying data consisted of long, irregular, and noisy time series. Limitations in traditional time series analysis don\'t allow for direct comparison of irregular sequences, which is computationally expensive and often unstable.'
        },
        {
          type: 'image',
          src: '../tsdev_workflow.png',
          alt: 'TSDev System Architecture Diagram',
        },
        {
          type: 'text',
          content: 'Many machine learning models are not suited for sequential data. By vectorizing time series into embeddings, TSDev addresses these challenges and enables the use of clustering, classification, and anomaly detection.'
        },
        {
          type: 'quote',
          content: 'Discrete Connections refer to the relationships between time series after being transformed into vector embeddings. Instead of comparing raw sequences, we evaluate a compact representation using distance metrics, similarity graphs, and machine learning algorithms.',
          author: 'Project Definition'
        },
        {
          type: 'math',
          content: 'f: \\mathbb{R}^n \\to \\mathbb{R}^d \\text{ where } n >> d'
        }
      ]
    },

    {
      id: 'architecture',
      title: 'System Architecture',
      blocks: [
        {
          type: 'text',
          content: 'The TSDev framework consists of several key components working together to transform time series data into meaningful vector representations:'
        },
        {
          type: 'list',
          items: [
            'Feature Window Aggregation (FWA) for temporal pattern extraction',
            'Tensor Processing Pipeline for efficient computation',
            'KNN-based similarity matching with FAISS optimization',
            'Machine Learning model for classification and clustering'
          ]
        },
        {
          type: 'code',
          language: 'python',
          filename: 'core_pipeline.py',
          content: `class TSDevPipeline:
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
        
        return embeddings`
        }
      ]
      }
    ]
  });
  
  export default TSDevTemplateBreakdown;