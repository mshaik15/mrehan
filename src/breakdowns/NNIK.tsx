import type { ProjectBreakdown } from '../types/breakdown';
import { BlockMath_ } from '../components/Math';

const NNIKBreakdown = (): ProjectBreakdown => ({
  metadata: {
    title: 'Neural Networks for Inverse Kinematics',
    subtitle: 'A Systematic Comparison of Inverse Kinematics Solvers Using Simulation-Based Benchmarks',
    projectType: 'Research',
    year: '2025',
    timeline: '2 months · June - Aug 2025',
    tools: ['PyTorch', 'CUDA', 'Pandas', 'NumPy', 'Matplotlib', 'Hydra'],
    status: 'Submitted',
    githubUrl: 'https://github.com/yourusername/eta',
    previewImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-3">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            Eta is a novel approach to solving the inverse kinematics problem using neural networks. 
            The project explores how deep learning can provide more efficient and accurate solutions 
            compared to traditional analytical methods.
          </p>
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            This research aims to reduce computational complexity while maintaining high accuracy 
            in robotic arm positioning and movement planning.
          </p>
        </div>
      )
    },
    
    {
      id: 'problem',
      title: 'Problem & Motivation',
      content: (
        <div className="space-y-3">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            Traditional inverse kinematics solutions often struggle with computational efficiency 
            and can face singularities in certain configurations. These limitations become 
            particularly problematic in real-time robotic applications.
          </p>
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            Neural networks offer the potential to learn complex mappings while avoiding 
            traditional mathematical constraints, potentially providing more robust solutions.
          </p>
          <BlockMath_>
            {`\\theta = f^{-1}(x, y, z) \\text{ where } f \\text{ is the forward kinematics function}`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'technical',
      title: 'Technical Details',
      content: (
        <div className="space-y-4">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            The neural network architecture consists of multiple fully connected layers with 
            ReLU activations. The model is trained on synthetic data generated from forward 
            kinematics calculations across the entire workspace.
          </p>
          
          <div className="bg-theme-bg-tertiary p-3 rounded-lg overflow-x-auto relative">
            <div className="absolute top-0 right-0 px-2 py-1 text-xs text-theme-text-muted bg-theme-bg-tertiary rounded-bl">
              Python
            </div>
            <pre className="text-xs text-theme-text-primary">
              <code>{`import torch
import torch.nn as nn

class InverseKinematicsNet(nn.Module):
    def __init__(self, input_dim=3, output_dim=6, hidden_dims=[128, 256, 128]):
        super().__init__()
        layers = []
        prev_dim = input_dim
        
        for hidden_dim in hidden_dims:
            layers.extend([
                nn.Linear(prev_dim, hidden_dim),
                nn.ReLU(),
                nn.Dropout(0.1)
            ])
            prev_dim = hidden_dim
            
        layers.append(nn.Linear(prev_dim, output_dim))
        self.network = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.network(x)`}</code>
            </pre>
          </div>
          
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            The loss function combines position error and joint angle constraints:
          </p>
          <BlockMath_>
            {`\\mathcal{L} = \\|\\mathbf{p}_{target} - \\mathbf{p}_{predicted}\\|^2 + \\lambda \\sum_{i} \\max(0, |\\theta_i| - \\theta_{max})^2`}
          </BlockMath_>
        </div>
      )
    },
    
    {
      id: 'results',
      title: 'Results & Analysis',
      content: (
        <div className="space-y-4">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            The neural network approach achieved a 95% accuracy rate in reaching target positions 
            within 1mm tolerance, with a 40% reduction in computation time compared to traditional 
            Jacobian-based methods.
          </p>
          
          <div className="border border-theme-border-primary/50 rounded-lg p-4 bg-theme-bg-tertiary/30">
            <div className="text-center space-y-2">
              <p className="text-theme-text-muted text-xs">Performance Comparison</p>
              <div className="grid grid-cols-2 gap-4 text-xs text-theme-text-secondary">
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
      id: 'learned',
      title: 'What I Learned',
      content: (
        <div className="space-y-3">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            This research provided deep insights into the intersection of robotics and machine learning. 
            Key learnings included the importance of data quality in training, network architecture 
            design for continuous outputs, and the trade-offs between accuracy and speed.
          </p>
          
          <ul className="space-y-1.5 text-theme-text-secondary text-sm sm:text-base">
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
      id: 'conclusion',
      title: 'Conclusion / Impact',
      content: (
        <div className="space-y-3">
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
            The Eta project successfully demonstrates that neural networks can provide efficient 
            and accurate solutions to inverse kinematics problems. The research contributes to 
            the growing field of learning-based robotics control.
          </p>
          <p className="text-theme-text-secondary text-sm sm:text-base leading-relaxed">
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

export default NNIKBreakdown;