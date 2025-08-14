import type { TemplateBreakdown } from '../types/breakdown';
import { 
  createText, 
  createMath,  
  createSection,
  createImage,
  Bold,
  indent,
  Link
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
    createSection('origin', 'Origin', [
      createText('TSDev is a framework used to convert messy, irregular time series into compact vector embeddings, enabling fast clustering, classification, and similarity search.'),
      createText('The project was originally built to analyze a friend\'s sports betting history, thousands of noisy and nonlinear data points. But this technique can be applied to finance, IoT sensors, healthcare, and any domain where raw sequences are too complex for direct analysis by machine learning algorithms.'),
      createText('TSdev follows a 2-step approach: first converting time series into vectors, then conducting machine learning analysis to provide insight.')
    ]),
    
    createSection('vectorizer', 'Vectorization Engine', [
      createImage('/vectorizer.png', 'TSDev System Architecture Diagram'),
      createText(['In step 1, we first use a custom algorithm called ', Bold('Flowing Window'), ' to convert the series into vector summaries.']),
      createText([Bold('The Flowing Window Algorithm'), ' works by sliding a fixed-size window across the time series and extracting a feature vector for each segment. ', Link('https://github.com/mshaik15/TsDev')('Full Breakdown')]),
      createMath('V^{(i)} = [\\mu_i, \\tilde{x}_i, \\hat{x}_i, \\sigma_i, \\dots, \\text{FFT}^{(i)}] \\quad \\text{FFT}^{(i)}_k = \\sum_{t=0}^{W-1} w^{(i)}_t e^{-2\\pi j k t / W}, \\quad k = 0, \\dots, W-1'),
      createMath('V = \\begin{bmatrix} V^{(1)} \\\\ V^{(2)} \\\\ \\vdots \\\\ V^{(N)} \\end{bmatrix} \\quad \\text{Tensor summarizes time, frequency, and statistical features across the series}'),
      createText('For every window, TSDev computes:'),
      ...indent([
        createText(['Statistical features: mean, variance, skewness, etc.']),
        createText(['Frequency-domain features: via Discrete Fourier Transform (DFT)'])
      ], 1),
      createText(['These per-window vectors are stacked into a ', Bold('high-dimensional tensor embedding'), ' that preserves both short-term fluctuations and long-term trends.']),
      createText('This process turns unpredictable, nonlinear data into a structured, fixed-length representation that can be stored and queried efficiently.'),
      createText([Bold('Vector Database Integration')]),
      createText('Embeddings are stored in FAISS, Pinecone, or Weaviate for millisecond-level retrieval, enabling large-scale similarity search and cross-series comparison.')
    ]),

    createSection('deep_learning', 'Deep Learning', [
      createText('In Step 2, we explore machine learning for insights into series data. Opportunities for deep learning are vast using this process; a few include:'),
      createText([Bold('KNN Search (FAISS):'), ' enables instant nearest-neighbour lookups, letting us quickly find similar patterns across massive datasets without reprocessing the raw series.']),
      createText([Bold('ML Models:'), ' once in vector form, the data can be used with a wide range of machine learning algorithms, even those not designed for sequential data. This opens the door for:']),
      ...indent([
        createText([Bold('Faster training:'), ' reduced sequence length and dimensionality, models converge quickly.']),
        createText([Bold('Model flexibility:'), ' enables the use of algorithms like SVMs, random forests, and gradient boosting, which work best with fixed-size inputs.']),
        createText([Bold('Accessibility:'), ' makes it easy to train on commodity hardware without needing specialized setups like RNNs or Transformers.']),
        createText([Bold('Cross-domain learning:'), ' embeddings from one domain (e.g., finance) can be compared or transferred to another (e.g., IoT) without retraining from scratch.'])
      ], 1),
      createText(['By vectorizing the data first, TSDev shifts the heavy lifting from model architecture to preprocessing, optimizing for both ', Bold('speed'), ' and ', Bold('adaptability'), ' while keeping the option open for more advanced sequence models if needed.'])
    ]),
    
    createSection('results', 'Results', [
      createText('TSDev successfully vectorized irregular betting data, revealing structure in sequences that traditional time series methods could not handle.'),
      createText('Similarity searches ran in milliseconds, and clustering highlighted meaningful relationships between series.'),
      createText(['The system is now being explored for ', Bold('quantitative finance'), ' and ', Bold('sensor analytics'), ', where the combination of speed, adaptability, and accuracy is critical.'])
    ])
  ]
});

export default TSDevTemplateBreakdown;

