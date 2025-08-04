import type { TemplateBreakdown } from '../types/breakdown';
import { 
  createText, 
  createMath, 
  createCode, 
  createList, 
  createMetrics,
  createSection 
} from '../utils/breakdownTemplateCreator';

const NNIKTemplateBreakdown = (): TemplateBreakdown => ({
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
    createSection('overview', 'Overview', [
      createText('Eta is a novel approach to solving the inverse kinematics problem using neural networks. The project explores how deep learning can provide more efficient and accurate solutions compared to traditional analytical methods.'),
      createText('This research aims to reduce computational complexity while maintaining high accuracy in robotic arm positioning and movement planning.')
    ]),
    
    createSection('problem', 'Problem & Motivation', [
      createText('Traditional inverse kinematics solutions often struggle with computational efficiency and can face singularities in certain configurations. These limitations become particularly problematic in real-time robotic applications.'),
      createText('Neural networks offer the potential to learn complex mappings while avoiding traditional mathematical constraints, potentially providing more robust solutions.'),
      createMath('\\theta = f^{-1}(x, y, z) \\text{ where } f \\text{ is the forward kinematics function}')
    ]),
    
    createSection('technical', 'Technical Details', [
      createText('The neural network architecture consists of multiple fully connected layers with ReLU activations. The model is trained on synthetic data generated from forward kinematics calculations across the entire workspace.'),
      createCode(`import torch
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
        return self.network(x)`, 'python', 'inverse_kinematics_net.py'),
      createText('The loss function combines position error and joint angle constraints:'),
      createMath('\\mathcal{L} = \\|\\mathbf{p}_{target} - \\mathbf{p}_{predicted}\\|^2 + \\lambda \\sum_{i} \\max(0, |\\theta_i| - \\theta_{max})^2')
    ]),
    
    createSection('results', 'Results & Analysis', [
      createText('The neural network approach achieved a 95% accuracy rate in reaching target positions within 1mm tolerance, with a 40% reduction in computation time compared to traditional Jacobian-based methods.'),
      createMetrics([
        {
          label: 'Neural Network Avg Time',
          value: '2.3ms',
          description: 'Average computation time'
        },
        {
          label: 'Traditional Avg Time', 
          value: '3.8ms',
          description: 'Jacobian-based method'
        },
        {
          label: 'NN Accuracy',
          value: '95%',
          description: 'Within 1mm tolerance'
        },
        {
          label: 'Traditional Accuracy',
          value: '92%',
          description: 'Within 1mm tolerance'
        }
      ], 'Performance Comparison')
    ]),
    
    createSection('learned', 'What I Learned', [
      createText('This research provided deep insights into the intersection of robotics and machine learning. Key learnings included the importance of data quality in training, network architecture design for continuous outputs, and the trade-offs between accuracy and speed.'),
      createList([
        'Advanced PyTorch optimization techniques for robotic applications',
        'CUDA programming for GPU acceleration', 
        'Mathematical modeling of kinematic constraints',
        'Research methodology and experimental design',
        'Scientific writing and data visualization'
      ])
    ]),
    
    createSection('conclusion', 'Conclusion / Impact', [
      createText('The Eta project successfully demonstrates that neural networks can provide efficient and accurate solutions to inverse kinematics problems. The research contributes to the growing field of learning-based robotics control.'),
      createText('Future work will explore real-time implementation on robotic hardware and extension to more complex kinematic chains with dynamic constraints.'),
      createMath('\\text{Research Impact} = \\text{Accuracy Improvement} \\times \\text{Speed Gain} \\times \\text{Applicability}')
    ])
  ]
});

export default NNIKTemplateBreakdown;