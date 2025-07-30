import type { ProjectBreakdown } from '../types/breakdown';
import { BlockMath_ } from '../components/Math';

const tsdevBreakdown = (): ProjectBreakdown => ({
  metadata: {
    title: 'TSDev',
    subtitle: 'Optimized Vectorization of Time Series Data for Machine Learning',
    projectType: 'Research',
    year: '2025',
    timeline: '2 months · June - Aug 2025',
    tools: ['PyTorch', 'CUDA', 'Pandas', 'NumPy', 'Matplotlib', 'FAISS'],

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
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            TSDev is a framework for applying machine learning and computational methods to time series by vectorization, enabling the discovery of discrete connections between series and sequences.
            Our goal was to prove our friend was good at sports betting by summarizing long, noisy, and nonlinear time series data into vector embeddings suitable for a variety of machine learning algorithms.
            This pipeline supports techniques such as clustering, classification, and similarity analysis, which are challenging to perform directly on raw time series.        
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            This project is applicable for any vectorization tasks, but we mainly test gambling and irresponsible means of making money!
          </p>
        </div>
      )
    },
    
    {
      id: 'problem',
      title: 'Problem & Definition',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We built TSDev to analyze my friend’s gambling habits, where the underlying data consisted of long, irregular, and noisy time series.
            Limitations in traditional time series analysis don't allow for direct comparison of irregular sequences, which is computationally expensive and often unstable. 
            Many machine learning models are not suited for sequential data. By vectorizing time series into embeddings, TSDev addresses these challenges and enables the use of clustering, classification, and anomaly detection.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            <span className="font-semibold">Discrete Connections</span> refer to the relationships between time series after being transformed into vector embeddings. 
            Instead of comparing raw sequences, we evaluate a compact representation using distance metrics, similarity graphs, and machine learning algorithms.
            This provides a consistent framework for analyzing nonlinear, noisy data across domains.
          </p>
          <BlockMath_>
            {`\\theta = f^{-1}(x, y, z) \\text{ where } f \\text{ is the forward kinematics function}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'fwa',
      title: 'FWA',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The neural network architecture consists of multiple fully connected layers with 
            ReLU activations. The model is trained on synthetic data generated from forward 
            kinematics calculations across the entire workspace.
          </p>
          
          {/* <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <div className="absolute top-0 right-0 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-bl">
              Python
            </div>
            <pre className="text-sm text-gray-100">
            </pre>
          </div> */}
          
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The loss function combines position error and joint angle constraints:
          </p>
          <BlockMath_>
            {`\\mathcal{L} = \\|\\mathbf{p}_{target} - \\mathbf{p}_{predicted}\\|^2 + \\lambda \\sum_{i} \\max(0, |\\theta_i| - \\theta_{max})^2`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'tensor processing',
      title: 'Tensor Processing',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The neural network approach achieved a 95% accuracy rate in reaching target positions 
            within 1mm tolerance, with a 40% reduction in computation time compared to traditional 
            Jacobian-based methods.
          </p>
          
          <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/30">
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">Performance Comparison</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>Neural Network: 2.3ms avg</div>
                <div>Traditional: 3.8ms avg</div>
                <div>Accuracy: 95%</div>
                <div>Traditional: 92%</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    {
      id: 'ml models',
      title: 'KNN & Improvements',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            This research provided deep insights into the intersection of robotics and machine learning. 
            Key learnings included the importance of data quality in training, network architecture 
            design for continuous outputs, and the trade-offs between accuracy and speed.
          </p>
          
          <ul className="space-y-2 text-gray-300 text-base sm:text-lg">
            <li>• Advanced PyTorch optimization techniques for robotic applications</li>
            <li>• CUDA programming for GPU acceleration</li>
            <li>• Mathematical modeling of kinematic constraints</li>
            <li>• Research methodology and experimental design</li>
            <li>• Scientific writing and data visualization</li>
          </ul>
        </div>
      )
    },
    
    {
      id: 'results',
      title: 'Results',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The Eta project successfully demonstrates that neural networks can provide efficient 
            and accurate solutions to inverse kinematics problems. The research contributes to 
            the growing field of learning-based robotics control.
          </p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Future work will explore real-time implementation on robotic hardware and extension 
            to more complex kinematic chains with dynamic constraints.
          </p>
          <BlockMath_>
            {`\\text{Research Impact} = \\text{Accuracy Improvement} \\times \\text{Speed Gain} \\times \\text{Applicability}`}
          </BlockMath_>
        </div>
      )
    }
  ]
});

export default tsdevBreakdown;