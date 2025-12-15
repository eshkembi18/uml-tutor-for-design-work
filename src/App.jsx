import { useState } from 'react';
import { Trophy, Award, Star, CheckCircle, Circle, Lock, BookOpen, Brain, Code, Target, ArrowRight, ArrowLeft, Home, Zap, MessageCircle, Sun, Moon } from 'lucide-react';
import classDiagramImg from './assets/class-diagram.png';
import classExampleImg from './assets/class-example.svg';
import umlClassImg from './assets/uml-diagram.svg';
import orderExampleImg from './assets/order1.svg';
import componentNotationImg from './assets/component-notation.svg';
import componentImg from './assets/component.svg';
import usecaseImg from './assets/usecase.svg';
import sequenceImg from './assets/sequence.svg';
import activityImg from './assets/activity.svg';
import stateImg from './assets/state.svg';
import deploymentImg from './assets/deployment.svg';
import packageImg from './assets/package.svg';
import communicationImg from './assets/communication.svg';
import './App.css';

const lessonImages = {
  'class-diagram': classDiagramImg,
  'class-example': classExampleImg,
  'uml-class': umlClassImg,
  'order1': orderExampleImg,
  'component-notation': componentNotationImg,
  component: componentImg,
  usecase: usecaseImg,
  sequence: sequenceImg,
  activity: activityImg,
  state: stateImg,
  deployment: deploymentImg,
  package: packageImg,
  communication: communicationImg,
};

const UMLTutor = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentSection, setCurrentSection] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [classFormInputs, setClassFormInputs] = useState({});
  const [relationshipForm, setRelationshipForm] = useState({ fromId: '', toId: '', type: 'association', label: '' });
  const [userProgress, setUserProgress] = useState({
    completedLessons: [],
    points: 0,
    badges: [],
    quizScores: {},
    challenges: {}
  });
  const [showPointPopup, setShowPointPopup] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [quizState, setQuizState] = useState(null);
  const [challengeState, setChallengeState] = useState(null);

  const badges = [
    { id: 'first_lesson', name: 'First Steps', icon: '🎯', description: 'Complete your first lesson', requirement: 1 },
    { id: 'quiz_master', name: 'Quiz Master', icon: '🧠', description: 'Score 100% on any quiz', requirement: 'perfect_quiz' },
    { id: 'challenge_ace', name: 'Challenge Ace', icon: '💪', description: 'Complete 3 challenges', requirement: 3 },
    { id: 'diagram_guru', name: 'Diagram Guru', icon: '📊', description: 'Complete all diagram lessons', requirement: 'all_diagrams' },
    { id: 'point_collector', name: 'Point Collector', icon: '⭐', description: 'Earn 500 points', requirement: 500 },
    { id: 'completionist', name: 'Completionist', icon: '🏆', description: 'Complete entire course', requirement: 'all_lessons' }
  ];

  const curriculum = {
    basics: {
      title: 'UML Basics & Concepts',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      lessons: [
        {
          id: 'intro',
          title: 'Introduction to UML',
          type: 'lesson',
          hasQuiz: true,
          content: `UML (Unified Modeling Language) is a standardized visual language for modeling software systems. It provides a way to visualize the design of a system through diagrams.

Key Benefits:
• Visual Communication - Makes complex systems easier to understand
• Standardization - Universal language understood by developers worldwide
• Documentation - Serves as blueprint for development teams
• Design Analysis - Helps identify potential issues before coding

UML consists of two main categories:
1. Structural Diagrams - Show static structure of the system
2. Behavioral Diagrams - Show dynamic behavior and interactions

Created in the 1990s by Grady Booch, Ivar Jacobson, and James Rumbaugh, UML has become the industry standard for object-oriented design.`,
          quiz: {
            questions: [
              {
                q: 'What does UML stand for?',
                options: ['Unified Modeling Language', 'Universal Method Language', 'Unified Method Logic', 'Universal Modeling Logic'],
                correct: 0,
                explanation: 'UML stands for Unified Modeling Language - a standardized visual language for software design.'
              },
              {
                q: 'What are the two main categories of UML diagrams?',
                options: ['Static and Dynamic', 'Structural and Behavioral', 'Class and Object', 'Design and Implementation'],
                correct: 1,
                explanation: 'UML diagrams are divided into Structural (static) and Behavioral (dynamic) categories.'
              },
              {
                q: 'What is a key benefit of using UML?',
                options: ['Faster coding', 'Visual communication of design', 'Automatic code generation', 'Reduced testing time'],
                correct: 1,
                explanation: 'UML excels at visual communication, making complex system designs easier to understand and discuss.'
              }
            ]
          }
        },
        {
          id: 'oop_concepts',
          title: 'OOP Concepts in UML',
          type: 'lesson',
          hasQuiz: true,
          hasInteractive: true,
          content: `Object-Oriented Programming concepts are fundamental to UML. Understanding these is crucial for effective modeling.

Core OOP Concepts:

1. Classes and Objects
   • Class: Blueprint/template for objects
   • Object: Instance of a class with actual data
   • Example: "Car" is a class, "My Honda Civic" is an object

2. Encapsulation
   • Bundling data and methods together
   • Hiding internal implementation details
   • Using access modifiers (public, private, protected)

3. Inheritance
   • Child classes inherit from parent classes
   • Promotes code reuse
   • "Is-a" relationship (Dog is-a Animal)

4. Polymorphism
   • Same interface, different implementations
   • Method overriding and overloading
   • Example: Different animals implement "makeSound()" differently

5. Abstraction
   • Hiding complex details
   • Showing only essential features
   • Using abstract classes and interfaces`,
          quiz: {
            questions: [
              {
                q: 'Which OOP concept involves hiding implementation details?',
                options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
                correct: 2,
                explanation: 'Encapsulation bundles data and methods while hiding internal implementation details.'
              },
              {
                q: 'What type of relationship does inheritance represent?',
                options: ['Has-a', 'Is-a', 'Uses-a', 'Contains-a'],
                correct: 1,
                explanation: 'Inheritance represents an "Is-a" relationship, where a child class IS A type of parent class.'
              },
              {
                q: 'What is an instance of a class called?',
                options: ['Template', 'Object', 'Method', 'Interface'],
                correct: 1,
                explanation: 'An object is a specific instance of a class with actual data values.'
              }
            ]
          }
        }
      ]
    },
    structural: {
      title: 'Structural Diagrams',
      icon: '🏗️',
      color: 'from-purple-500 to-pink-500',
      lessons: [
        {
          id: 'class_diagram',
          title: 'Class Diagrams',
          type: 'lesson',
          hasQuiz: true,
          hasChallenge: true,
          content: `Class Diagrams are the most commonly used UML diagram. They show the static structure of a system by depicting classes, attributes, operations, and relationships.

Class Structure (see diagram below):
• Class Name (bold, centered)
• Attributes list (- private, + public, # protected, ~ package)
• Methods/operations list with visibility
[IMAGE:class-diagram]

Visibility Modifiers:
+ public    - accessible from anywhere
- private   - accessible only within the class
# protected - accessible within class and subclasses
~ package   - accessible within package

Relationships:
-> Association     - general relationship
◆-> Composition    - strong "has-a" (filled diamond)
◇-> Aggregation    - weak "has-a" (hollow diamond)
--> Generalization - inheritance (hollow arrow)
---> Realization   - implements interface (dashed)

Example - Inheritance:
[IMAGE:class-example]

`,
          quiz: {
            questions: [
              {
                q: 'What does the "-" symbol mean in a class diagram?',
                options: ['Public', 'Private', 'Protected', 'Package'],
                correct: 1,
                explanation: 'The "-" symbol indicates a private attribute or method, accessible only within the class.'
              },
              {
                q: 'Which relationship uses a filled diamond?',
                options: ['Association', 'Aggregation', 'Composition', 'Inheritance'],
                correct: 2,
                explanation: 'Composition uses a filled diamond (◆) to show a strong "has-a" relationship where parts cannot exist without the whole.'
              },
              {
                q: 'What does a hollow arrow represent?',
                options: ['Association', 'Composition', 'Inheritance', 'Aggregation'],
                correct: 2,
                explanation: 'A hollow arrow (───▷) represents inheritance/generalization, showing an "is-a" relationship.'
              }
            ]
          },
          challenge: {
            title: 'Design a Library System',
            description: 'Create a class diagram for a library system with Book, Member, and Librarian classes.',
            scenario: `Design a class diagram for a library system with:
- Book class (title, author, ISBN, availability)
- Member class (memberID, name, borrowedBooks)
- Librarian class (employeeID, name)
- Library class that manages books and members

Include appropriate attributes, methods, and relationships.`,
            hints: [
              'Start with the main classes: Book, Member, Librarian, and Library',
              'Library should have composition relationships with Book and Member',
              'Consider what methods each class needs (borrowBook, returnBook, etc.)',
              'Librarian could inherit from or be associated with Member'
            ],
            solution: `┌─────────────────┐
│     Library     │
├─────────────────┤
│ - name          │
│ - address       │
├─────────────────┤
│ + addBook()     │
│ + registerMem() │
└─────────────────┘
     ◆│         ◆│
      │          └──────┐
┌─────────────┐    ┌──────────────┐
│    Book     │    │   Member     │
├─────────────┤    ├──────────────┤
│ - title     │    │ - memberID   │
│ - author    │    │ - name       │
│ - ISBN      │    │ - borrowed[] │
│ - available │    ├──────────────┤
├─────────────┤    │ + borrow()   │
│ + checkOut()│    │ + return()   │
└─────────────┘    └──────────────┘
                         △
                         │
                   ┌──────────────┐
                   │  Librarian   │
                   ├──────────────┤
                   │ - employeeID │
                   ├──────────────┤
                   │ + addBook()  │
                   └──────────────┘`
          }
        },
        {
          id: 'object_diagram',
          title: 'Object Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Object Diagrams show instances of classes at a specific moment in time. They're like snapshots of the system showing actual objects and their relationships.

Object Notation:
[IMAGE:uml-class]

Key Differences from Class Diagrams:
• Shows instances, not templates
• Contains actual data values
• Object names are underlined
• Represents system at specific time
• No methods shown (only data)

Example - E-commerce Order:
[IMAGE:order1]

Use Cases:
• Testing scenarios
• Example instances
• Debugging complex relationships
• Documentation of actual data
• Validation of class design`,
          quiz: {
            questions: [
              {
                q: 'How are object names shown in object diagrams?',
                options: ['Bold', 'Italic', 'Underlined', 'Capitalized'],
                correct: 2,
                explanation: 'Object names are underlined to distinguish them from class names in diagrams.'
              },
              {
                q: 'What do object diagrams primarily show?',
                options: ['Class methods', 'Actual data values', 'Inheritance hierarchy', 'Abstract concepts'],
                correct: 1,
                explanation: 'Object diagrams show instances with actual data values at a specific point in time.'
              },
              {
                q: 'When are object diagrams most useful?',
                options: ['Initial design', 'Testing scenarios', 'Code generation', 'Performance analysis'],
                correct: 1,
                explanation: 'Object diagrams are particularly useful for testing scenarios and showing example instances.'
              }
            ]
          }
        },
        {
          id: 'component_diagram',
          title: 'Component Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Component Diagrams show the organization and dependencies among software components. They model the physical aspects of object-oriented systems.

Component Notation:
[IMAGE:component-notation]

Interfaces:
○─ Provided Interface (lollipop) - services offered
─( Required Interface (socket) - services needed

Example - Web Application:
[IMAGE:component]

Key Elements:
• Components - modular units
• Interfaces - connection points
• Dependencies - "uses" relationships
• Ports - interaction points
• Artifacts - physical files

Benefits:
• Shows system architecture
• Identifies reusable components
• Plans deployment structure
• Visualizes dependencies
• Supports team coordination`,
          quiz: {
            questions: [
              {
                q: 'What does the "lollipop" symbol represent?',
                options: ['Required interface', 'Provided interface', 'Component', 'Dependency'],
                correct: 1,
                explanation: 'The lollipop symbol (○─) represents a provided interface - services that the component offers.'
              },
              {
                q: 'What is the main purpose of component diagrams?',
                options: ['Show class relationships', 'Model physical system organization', 'Display user interactions', 'Document algorithms'],
                correct: 1,
                explanation: 'Component diagrams model the physical organization and dependencies of software components.'
              },
              {
                q: 'What does a socket symbol represent?',
                options: ['Network connection', 'Required interface', 'Database', 'User input'],
                correct: 1,
                explanation: 'The socket symbol (─() represents a required interface - services the component needs.'
              }
            ]
          }
        }
      ]
    },
    behavioral: {
      title: 'Behavioral Diagrams',
      icon: '⚡',
      color: 'from-green-500 to-teal-500',
      lessons: [
        {
          id: 'use_case',
          title: 'Use Case Diagrams',
          type: 'lesson',
          hasQuiz: true,
          hasChallenge: true,
          content: `Use Case Diagrams capture system functionality from a user's perspective. They show what the system does, not how it does it.



Relationships:
──── Association  - actor uses use case
────▷ Include     - mandatory sub-use case
- - ▷ Extend      - optional variation

Example - ATM System:
[IMAGE:usecase]

Actor Types:
• Primary - initiates use case
• Secondary - participates
• System - external systems

Best Practices:
• Use verb phrases for use cases
• Focus on user goals
• Keep it simple and clear
• One diagram per system view
• Identify all actors first`,
          quiz: {
            questions: [
              {
                q: 'What shape represents a use case?',
                options: ['Rectangle', 'Oval', 'Diamond', 'Circle'],
                correct: 1,
                explanation: 'Use cases are represented by ovals containing the use case name.'
              },
              {
                q: 'What does an <<include>> relationship mean?',
                options: ['Optional behavior', 'Mandatory sub-use case', 'Alternative flow', 'Error handling'],
                correct: 1,
                explanation: '<<include>> indicates a mandatory sub-use case that must always be executed.'
              },
              {
                q: 'What is a primary actor?',
                options: ['System administrator', 'One who initiates the use case', 'External system', 'Database'],
                correct: 1,
                explanation: 'A primary actor is the one who initiates the use case to achieve a goal.'
              }
            ]
          },
          challenge: {
            title: 'Design an Online Shopping Use Case',
            description: 'Create a use case diagram for an online shopping system.',
            scenario: `Design a use case diagram for an online shopping system with:
- Customer (can browse, add to cart, checkout, track order)
- Guest (can only browse and view products)
- Admin (can manage inventory, view reports)
- Payment Gateway (external system)

Include appropriate relationships (include, extend).`,
            hints: [
              'Identify all actors: Customer, Guest, Admin, Payment Gateway',
              'Checkout should include "Process Payment" with Payment Gateway',
              'Consider what extends what (e.g., "Apply Coupon" extends "Checkout")',
              'Guest has limited access compared to Customer'
            ],
            solution: `┌─────────────────────────────────────┐
│    Online Shopping System          │
   o    │                                    │
  /|\\   │  (Browse Products) ←─── (Guest)   │
  / \\   │         │                         │
Customer │         │                         │
         │  (Add to Cart)                   │
         │         │                         │
         │  (Checkout)                      │
         │      │                            │
         │      │ <<include>>                │
         │      ▼                            │
         │  (Process Payment)──→ Payment    │
         │      │                  Gateway   │
         │      │ <<extend>>                 │
         │      ▼                            │
         │  (Apply Coupon)                  │
         │                                   │
         │  (Track Order)                   │
         │                                   │
   o     │  (Manage Inventory)              │
  /|\\    │                                   │
  / \\    │  (View Reports)                  │
 Admin   │                                   │
         └─────────────────────────────────┘`
          }
        },
        {
          id: 'sequence_diagram',
          title: 'Sequence Diagrams',
          type: 'lesson',
          hasQuiz: true,
          hasChallenge: true,
          content: `Sequence Diagrams show how objects interact over time. They emphasize the order of messages exchanged between objects.

Elements:
• Lifeline   - vertical dashed line
• Activation - thin rectangle on lifeline
• Message    - horizontal arrow
• Return     - dashed arrow
• Note       - rectangle with folded corner

Message Types:
─────> Synchronous (waits for response)
- - -> Asynchronous (doesn't wait)
<---- Return message
───X  Message lost
X───  Message found

[IMAGE:sequence]

Activation boxes show when object is active
Self-calls show recursion or internal processing

Control Structures:
• alt - alternative paths (if-else)
• opt - optional path (if)
• loop - iteration
• par - parallel execution`,
          quiz: {
            questions: [
              {
                q: 'What does a dashed arrow typically represent?',
                options: ['Synchronous message', 'Return message', 'Lost message', 'Creation'],
                correct: 1,
                explanation: 'A dashed arrow represents a return message from a previous call.'
              },
              {
                q: 'What is a lifeline in a sequence diagram?',
                options: ['Horizontal line', 'Vertical dashed line', 'Activation box', 'Message arrow'],
                correct: 1,
                explanation: 'A lifeline is the vertical dashed line showing an object\'s existence over time.'
              },
              {
                q: 'What does an activation box show?',
                options: ['Object creation', 'When object is processing', 'Object deletion', 'Message sending'],
                correct: 1,
                explanation: 'An activation box (thin rectangle) shows when an object is active and processing.'
              }
            ]
          },
          challenge: {
            title: 'Model an Email Sending Process',
            description: 'Create a sequence diagram for sending an email through a web application.',
            scenario: `Model the sequence for sending an email:
1. User clicks "Send" in Email Client
2. Email Client validates the email
3. Client sends to SMTP Server
4. SMTP Server processes and sends
5. Server confirms delivery
6. Client shows success to User

Include proper message types and activations.`,
            hints: [
              'Start with User and Email Client interaction',
              'Remember validation happens before sending',
              'SMTP Server should have an activation during processing',
              'Use return messages for confirmations'
            ],
            solution: `User   EmailClient  SMTPServer
 │          │            │
 │──send───>│            │
 │          │─validate() │
 │          │<───ok─────>│
 │          │────send───>│
 │          │            │─process()
 │          │            │<─done────
 │          │            │─deliver()
 │          │<─confirm───│
 │<─success─│            │
 │          │            │`
          }
        },
        {
          id: 'activity_diagram',
          title: 'Activity Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Activity Diagrams model workflows and business processes. They're similar to flowcharts but more powerful.

Basic Elements:
 (●) Start node (filled circle)
 (◉) End node (bullseye)
 ┌───────┐
 │Action │ Activity/Action
 └───────┘
 ◇ Decision (diamond)
 ▬▬▬ Fork/Join (thick bar)

Example - Order Processing:
[IMAGE:activity]

Advanced Features:
• Swimlanes - show responsibilities
• Object nodes - data flow
• Signals - send/receive events
• Exception handlers

Use Cases:
• Business process modeling
• Algorithm visualization
• Workflow documentation
• Use case elaboration`,
          quiz: {
            questions: [
              {
                q: 'What does a diamond shape represent?',
                options: ['Start node', 'Action', 'Decision point', 'End node'],
                correct: 2,
                explanation: 'A diamond (◇) represents a decision point where the flow branches based on conditions.'
              },
              {
                q: 'What is the purpose of a fork node?',
                options: ['End the process', 'Make a decision', 'Start parallel activities', 'Loop back'],
                correct: 2,
                explanation: 'A fork node (thick bar) splits the flow to start multiple parallel activities.'
              },
              {
                q: 'What are swimlanes used for?',
                options: ['Parallel processes', 'Show responsibilities', 'Error handling', 'Timing'],
                correct: 1,
                explanation: 'Swimlanes divide the diagram to show which actor/component is responsible for each action.'
              }
            ]
          }
        },
        {
          id: 'state_diagram',
          title: 'State Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `State Diagrams (State Machine Diagrams) model the states of an object and transitions between states during its lifetime.

[IMAGE:state]

Transition Syntax:
event [guard] / action
• event - trigger
• [guard] - condition
• action - performed during transition

Composite States:
Can contain sub-states for complex behavior

Key Concepts:
• State - condition/situation
• Transition - change from one state to another
• Event - trigger causing transition
• Guard - condition for transition
• Action - behavior during transition

Applications:
• User interface behavior
• Protocol implementations
• Device controllers
• Game character AI`,
          quiz: {
            questions: [
              {
                q: 'What triggers a state transition?',
                options: ['Action', 'Event', 'Guard', 'Activity'],
                correct: 1,
                explanation: 'An event triggers a state transition, potentially with a guard condition and action.'
              },
              {
                q: 'What is a guard condition?',
                options: ['Exit action', 'Transition condition', 'State name', 'Initial state'],
                correct: 1,
                explanation: 'A guard is a boolean condition that must be true for the transition to occur.'
              },
              {
                q: 'What does "do/activity" represent in a state?',
                options: ['Entry action', 'Exit action', 'Ongoing activity', 'Transition'],
                correct: 2,
                explanation: 'do/activity represents an ongoing activity that executes while the object is in that state.'
              }
            ]
          }
        }
      ]
    },
    advanced: {
      title: 'Advanced Diagrams',
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      lessons: [
        {
          id: 'deployment_diagram',
          title: 'Deployment Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Deployment Diagrams show the physical architecture of the system - hardware, software, and their relationships.

[IMAGE:deployment]

Communication Paths:
────  Association
HTTP, TCP/IP, etc. - protocols

Node Types:
• Device - physical hardware
• Execution Environment - software container
• Artifact - file or component

Stereotypes:
<<device>> - hardware
<<executionEnvironment>> - software platform
<<artifact>> - deployable file

Use Cases:
• System architecture planning
• Infrastructure documentation
• Deployment planning
• Capacity planning
• Network topology

Shows:
• Hardware topology
• Software distribution
• Communication protocols
• Physical connections
• Deployment units`,
          quiz: {
            questions: [
              {
                q: 'What does a deployment diagram primarily show?',
                options: ['Class relationships', 'Physical architecture', 'User workflows', 'Code structure'],
                correct: 1,
                explanation: 'Deployment diagrams show the physical architecture including hardware and software distribution.'
              },
              {
                q: 'What is a node in a deployment diagram?',
                options: ['A class', 'Physical or execution resource', 'A method', 'A database table'],
                correct: 1,
                explanation: 'A node represents a physical device or execution environment where components are deployed.'
              },
              {
                q: 'What stereotype is used for hardware?',
                options: ['<<artifact>>', '<<device>>', '<<component>>', '<<hardware>>'],
                correct: 1,
                explanation: '<<device>> is the stereotype used to denote physical hardware in deployment diagrams.'
              }
            ]
          }
        },
        {
          id: 'package_diagram',
          title: 'Package Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Package Diagrams organize model elements into groups (packages) and show dependencies between packages.

[IMAGE:package]

Visibility:
+ Public
- Private
# Protected
~ Package

Benefits:
• Organize large systems
• Show high-level structure
• Manage dependencies
• Support team organization
• Enable modular development

Best Practices:
• Keep dependencies acyclic
• Minimize coupling
• Maximize cohesion
• One responsibility per package
• Clear naming conventions`,
          quiz: {
            questions: [
              {
                q: 'What is the main purpose of package diagrams?',
                options: ['Show object instances', 'Organize elements into groups', 'Model behavior', 'Show timing'],
                correct: 1,
                explanation: 'Package diagrams organize model elements into logical groups and show dependencies between them.'
              },
              {
                q: 'What does <<import>> dependency mean?',
                options: ['Private access', 'Public access', 'No access', 'Temporary access'],
                correct: 1,
                explanation: '<<import>> indicates public access - the importing package can access public elements of the imported package.'
              },
              {
                q: 'Why should package dependencies be acyclic?',
                options: ['Better performance', 'Avoid circular dependencies', 'Easier testing', 'Faster compilation'],
                correct: 1,
                explanation: 'Acyclic dependencies prevent circular references which can cause maintenance and build issues.'
              }
            ]
          }
        },
        {
          id: 'communication_diagram',
          title: 'Communication Diagrams',
          type: 'lesson',
          hasQuiz: true,
          content: `Communication Diagrams (formerly Collaboration Diagrams) show object interactions emphasizing the structural organization rather than time sequence.

[IMAGE:communication]

vs Sequence Diagram:
• Shows structure, not timeline
• Links between objects visible
• Good for complex relationships
• Harder to see sequence
• Better for static view

Message Format:
sequence: message(args): returnValue

Conditions & Iterations:
[condition] message  - conditional
* [i:=1..n] message  - iteration

Links:
Association, aggregation, etc.
Shows structural relationships

When to Use:
• Focus on object relationships
• Static context important
• Complex object structures
• Alternative to sequence diagrams
• Documentation of collaborations`,
          quiz: {
            questions: [
              {
                q: 'How are messages numbered in communication diagrams?',
                options: ['By time', 'Hierarchically (1, 1.1, 1.2)', 'Alphabetically', 'Randomly'],
                correct: 1,
                explanation: 'Messages are numbered hierarchically (1, 1.1, 1.2) to show nesting and call structure.'
              },
              {
                q: 'What does communication diagram emphasize over sequence diagram?',
                options: ['Timing', 'Structural relationships', 'Performance', 'Complexity'],
                correct: 1,
                explanation: 'Communication diagrams emphasize structural relationships between objects rather than time sequence.'
              },
              {
                q: 'What does "1.2.1" in message numbering indicate?',
                options: ['First message', 'Third-level nested call', 'Alternative path', 'Error message'],
                correct: 1,
                explanation: '1.2.1 indicates a nested call at the third level - a call within a call within a call.'
              }
            ]
          }
        }
      ]
    }
  };

  const addPoints = (points, reason) => {
    setUserProgress(prev => ({ ...prev, points: prev.points + points }));
    setPointsEarned(points);
    setShowPointPopup(true);
    setTimeout(() => setShowPointPopup(false), 2000);
    checkBadges(points);
  };

  const checkBadges = (newPoints) => {
    const totalPoints = userProgress.points + newPoints;
    const completedLessons = userProgress.completedLessons.length;
    const perfectQuizzes = Object.values(userProgress.quizScores).filter(s => s === 100).length;
    const completedChallenges = Object.keys(userProgress.challenges).length;

    badges.forEach(badge => {
      if (!userProgress.badges.includes(badge.id)) {
        let unlock = false;
        if (badge.requirement === 1 && completedLessons >= 1) unlock = true;
        if (badge.requirement === 'perfect_quiz' && perfectQuizzes > 0) unlock = true;
        if (badge.requirement === 3 && completedChallenges >= 3) unlock = true;
        if (badge.requirement === 500 && totalPoints >= 500) unlock = true;
        
        if (unlock) {
          setUserProgress(prev => ({
            ...prev,
            badges: [...prev.badges, badge.id]
          }));
        }
      }
    });
  };

  const completeLesson = (lessonId) => {
    if (!userProgress.completedLessons.includes(lessonId)) {
      setUserProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }));
      addPoints(50, 'Lesson completed!');
    }
  };

  const startQuiz = (lesson) => {
    setQuizState({
      lesson: lesson,
      currentQuestion: 0,
      answers: [],
      score: 0,
      showResults: false
    });
    setCurrentView('quiz');
  };

  const answerQuestion = (answerIndex) => {
    const question = quizState.lesson.quiz.questions[quizState.currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    const newAnswers = [...quizState.answers, { 
      question: quizState.currentQuestion, 
      answer: answerIndex, 
      correct: isCorrect 
    }];

    if (quizState.currentQuestion < quizState.lesson.quiz.questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers,
        score: isCorrect ? quizState.score + 1 : quizState.score
      });
    } else {
      const finalScore = isCorrect ? quizState.score + 1 : quizState.score;
      const percentage = Math.round((finalScore / quizState.lesson.quiz.questions.length) * 100);
      
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: finalScore,
        showResults: true
      });

      setUserProgress(prev => ({
        ...prev,
        quizScores: { ...prev.quizScores, [quizState.lesson.id]: percentage }
      }));

      if (percentage === 100) {
        addPoints(100, 'Perfect score!');
      } else if (percentage >= 70) {
        addPoints(50, 'Quiz passed!');
      }
    }
  };

  const parseRequiredClasses = (scenarioText) => {
    const matches = [];
    const regex = /(\b[A-Z][a-zA-Z0-9_]*)\s+class/gi;
    let match;
    while ((match = regex.exec(scenarioText || '')) !== null) {
      matches.push(match[1]);
    }
    return Array.from(new Set(matches));
  };

  const createTemplateDiagram = (lesson) => {
    const required = parseRequiredClasses(lesson.challenge.scenario);
    const fallback = ['Class1', 'Class2', 'Class3'];
    const names = required.length ? required : fallback;
    const classes = names.map((name, idx) => ({
      id: `c${Date.now()}-${idx}`,
      name,
      attributes: [],
      methods: []
    }));
    return { classes, relationships: [] };
  };

  const storageKeyForLesson = (lessonId) => `uml-challenge-${lessonId}`;

  const startChallenge = (lesson) => {
    const storageKey = storageKeyForLesson(lesson.id);
    let diagram = createTemplateDiagram(lesson);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.classes && parsed?.relationships) {
          diagram = parsed;
        }
      }
    } catch (e) {
      // ignore parse errors and fall back to template
    }

    const firstId = diagram.classes[0]?.id || '';
    const secondId = diagram.classes[1]?.id || firstId;
    setClassFormInputs({});
    setRelationshipForm({ fromId: firstId, toId: secondId, type: 'association', label: '' });

    setChallengeState({
      lesson: lesson,
      userSolution: generateSolutionFromDiagram(diagram),
      hintsUsed: 0,
      showSolution: false,
      submitted: false,
      feedback: '',
      diagram,
      selectedClassId: diagram.classes[0]?.id || null,
      edgeType: 'association',
      nodeEditor: {
        title: diagram.classes[0]?.name || '',
        attributesText: diagram.classes[0]?.attributes?.join('\n') || '',
        methodsText: diagram.classes[0]?.methods?.join('\n') || ''
      }
    });
    setCurrentView('challenge');
  };

  const buildReadiness = (diagram, scenarioText) => {
    const scenario = (scenarioText || '').toLowerCase();
    const requiredNames = parseRequiredClasses(scenarioText || '').map(n => n.toLowerCase());
    const titles = diagram.classes.map(c => (c.name || '').toLowerCase());
    const hasRequired = requiredNames.length === 0 || requiredNames.every(name => titles.some(t => t.includes(name)));

    return {
      classesOk: diagram.classes.length >= 3,
      relationshipsOk: diagram.relationships.length >= 1,
      requiredOk: hasRequired
    };
  };

  const generateSolutionFromDiagram = (diagram) => {
    const idToTitle = Object.fromEntries(diagram.classes.map(c => [c.id, c.name || c.id]));
    const classLines = diagram.classes.map(c => {
      const attrs = c.attributes?.filter(Boolean).join(', ') || '';
      const methods = c.methods?.filter(Boolean).join(', ') || '';
      return `- ${c.name || '(unnamed)'}: attrs=[${attrs}] methods=[${methods}]`;
    });
    const relLines = diagram.relationships.map(r => {
      const label = r.label ? `(${r.label})` : '';
      return `- ${idToTitle[r.fromId] || r.fromId} --${r.type}${label}--> ${idToTitle[r.toId] || r.toId}`;
    });
    return [
      'Classes:',
      ...classLines,
      'Relationships:',
      ...relLines
    ].join('\n');
  };

  const submitChallenge = () => {
    const readiness = buildReadiness(challengeState.diagram, challengeState.lesson.challenge.scenario);
    const readyToSubmit = readiness.classesOk && readiness.relationshipsOk && readiness.requiredOk;

    if (!readyToSubmit) {
      setChallengeState(prev => ({
        ...prev,
        submitted: true,
        feedback: 'Add at least 3 classes, connect them with a relationship, and include the required classes from the scenario.'
      }));
      return;
    }

    setChallengeState(prev => ({
      ...prev,
      submitted: true,
      feedback: ''
    }));

    if (!userProgress.challenges[challengeState.lesson.id]) {
      setUserProgress(prev => ({
        ...prev,
        challenges: { ...prev.challenges, [challengeState.lesson.id]: true }
      }));
      
      const points = challengeState.hintsUsed === 0 ? 150 : 100;
      addPoints(points, 'Challenge completed!');
    }
  };

  const calculateProgress = () => {
    let totalLessons = 0;
    Object.values(curriculum).forEach(section => {
      totalLessons += section.lessons.length;
    });
    return Math.round((userProgress.completedLessons.length / totalLessons) * 100);
  };

  const themeClass = darkMode ? 'theme-dark' : 'theme-light';
  const primaryGradient = darkMode ? 'from-cyan-600 to-blue-600' : 'from-sky-400 to-teal-400';
  const primaryGradientReverse = darkMode ? 'from-blue-600 to-cyan-600' : 'from-teal-400 to-sky-300';
  const primaryHoverGradient = darkMode ? 'hover:from-cyan-500 hover:to-blue-500' : 'hover:from-sky-300 hover:to-teal-300';
  const primaryHoverGradientReverse = darkMode ? 'hover:from-blue-500 hover:to-cyan-500' : 'hover:from-teal-300 hover:to-sky-200';
  const primaryBorder = darkMode ? 'border-blue-500/50' : 'border-sky-400/70';
  const primaryText = darkMode ? 'text-blue-400' : 'text-sky-500';
  const primaryBadgeBg = darkMode ? 'bg-blue-600' : 'bg-sky-500';
  const accentGradient = darkMode ? 'from-purple-600 to-pink-600' : 'from-fuchsia-400 to-pink-400';
  const accentHoverGradient = darkMode ? 'hover:from-purple-500 hover:to-pink-500' : 'hover:from-fuchsia-300 hover:to-pink-300';
  const accentBorder = darkMode ? 'border-purple-500/50' : 'border-fuchsia-400/70';
  const accentText = darkMode ? 'text-purple-400' : 'text-fuchsia-500';
  const accentBadgeBg = darkMode ? 'bg-purple-600' : 'bg-fuchsia-400';
  const sectionGradient = (gradient) => (!darkMode && gradient === 'from-blue-500 to-cyan-500' ? 'from-sky-400 to-cyan-300' : gradient);

  const renderHome = () => (
    <div className={`app-shell ${themeClass}`}>
      <div className="max-w-7xl mx-auto">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`card p-3 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className={`w-6 h-6 ${accentText}`} />}
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            UML Tutor
          </h1>
          <p className="text-xl text-secondary mb-8">Master Object-Oriented Design through Interactive Learning</p>
          
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`bg-gradient-to-br ${primaryGradientReverse} rounded-xl p-6 shadow-lg transform hover:scale-105 transition`}>
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8" />
                <span className="text-3xl font-bold">{userProgress.points}</span>
              </div>
              <p className="text-sm opacity-90">Total Points</p>
            </div>
            
            <div className={`bg-gradient-to-br ${accentGradient} rounded-xl p-6 shadow-lg transform hover:scale-105 transition`}>
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8" />
                <span className="text-3xl font-bold">{userProgress.badges.length}</span>
              </div>
              <p className="text-sm opacity-90">Badges Earned</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 shadow-lg transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8" />
                <span className="text-3xl font-bold">{userProgress.completedLessons.length}</span>
              </div>
              <p className="text-sm opacity-90">Lessons Completed</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 shadow-lg transform hover:scale-105 transition">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8" />
                <span className="text-3xl font-bold">{calculateProgress()}%</span>
              </div>
              <p className="text-sm opacity-90">Course Progress</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bg rounded-full h-4 overflow-hidden mb-8">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`card rounded-xl p-6 border-2 ${primaryBorder} shadow-lg`}>
            <Brain className={`w-12 h-12 ${primaryText} mb-4`} />
            <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
            <p className="text-tertiary">Engaging content with real-world examples and visual diagrams</p>
          </div>
          
          <div className={`card rounded-xl p-6 border-2 ${accentBorder} shadow-lg`}>
            <MessageCircle className={`w-12 h-12 ${accentText} mb-4`} />
            <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
            <p className="text-tertiary">Quizzes with detailed explanations and immediate results</p>
          </div>
          
          <div className="card rounded-xl p-6 border-2 border-green-500/50 shadow-lg">
            <Code className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Hands-On Practice</h3>
            <p className="text-tertiary">Real scenarios and diagram-building challenges</p>
          </div>
        </div>

        {/* Curriculum Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(curriculum).map(([key, section]) => (
            <div 
              key={key}
              className="card rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition cursor-pointer"
              onClick={() => {
                setCurrentSection(key);
                setCurrentView('section');
              }}
            >
              <div className={`bg-gradient-to-r ${sectionGradient(section.color)} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl mb-2">{section.icon}</div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className={`w-5 h-5 ${primaryText}`} />
                  <span className="text-secondary">{section.lessons.length} Lessons</span>
                </div>
                
                <div className="space-y-2">
                  {section.lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-2 text-sm">
                      {userProgress.completedLessons.includes(lesson.id) ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Circle className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      )}
                      <span className="text-tertiary">{lesson.title}</span>
                      <div className="flex gap-1 ml-auto">
                        {lesson.hasQuiz && <span className={`text-xs ${primaryBadgeBg} px-2 py-1 rounded`}>Quiz</span>}
                        {lesson.hasChallenge && <span className={`text-xs ${accentBadgeBg} px-2 py-1 rounded`}>Challenge</span>}
                        {lesson.hasInteractive && <span className="text-xs bg-green-600 px-2 py-1 rounded">Interactive</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="mt-12 card rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map(badge => {
              const earned = userProgress.badges.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  className={`rounded-xl p-4 text-center transform transition ${
                    earned 
                      ? 'bg-gradient-to-br from-yellow-600 to-orange-600 scale-105 shadow-lg' 
                      : `${darkMode ? 'bg-gray-700 opacity-50' : 'bg-gray-200 opacity-50'}`
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-bold mb-1">{badge.name}</div>
                  <div className={`text-xs ${earned ? 'text-gray-100' : 'text-tertiary'}`}>{badge.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Point Popup */}
      {showPointPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-6 rounded-2xl shadow-2xl animate-bounce z-50">
          <div className="flex items-center gap-4">
            <Star className="w-12 h-12" />
            <div>
              <div className="text-3xl font-bold">+{pointsEarned} Points!</div>
              <div className="text-sm opacity-90">Great job!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    const section = curriculum[currentSection];
    
    return (
      <div className={`app-shell ${themeClass}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-secondary hover:text-primary transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="card p-3 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className={`w-5 h-5 ${accentText}`} />}
            </button>
          </div>

          <div className={`bg-gradient-to-r ${sectionGradient(section.color)} rounded-2xl p-8 mb-8`}>
            <div className="text-6xl mb-4">{section.icon}</div>
            <h1 className="text-4xl font-bold">{section.title}</h1>
          </div>

          <div className="space-y-4">
            {section.lessons.map((lesson, index) => {
              const completed = userProgress.completedLessons.includes(lesson.id);
              const quizScore = userProgress.quizScores[lesson.id];
              const challengeComplete = userProgress.challenges[lesson.id];

              return (
                <div 
                  key={lesson.id}
                  className="card rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-102"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {completed ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-600" />
                        )}
                        <h3 className="text-2xl font-bold">{lesson.title}</h3>
                      </div>
                      
                      <div className="flex gap-2 mb-3">
                        {lesson.hasQuiz && (
                          <span className={`text-xs ${primaryBadgeBg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <Brain className="w-3 h-3" />
                            Quiz Available
                            {quizScore !== undefined && ` (${quizScore}%)`}
                          </span>
                        )}
                        {lesson.hasChallenge && (
                          <span className={`text-xs ${accentBadgeBg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <Code className={`w-3 h-3 ${accentText}`} />
                            Challenge
                            {challengeComplete && ' ✓'}
                          </span>
                        )}
                        {lesson.hasInteractive && (
                          <span className="text-xs bg-green-600 px-3 py-1 rounded-full flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Interactive
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentLesson(lesson);
                        setCurrentView('lesson');
                      }}
                      className={`bg-gradient-to-r ${primaryGradient} px-6 py-3 rounded-lg font-bold ${primaryHoverGradient} transition flex items-center gap-2`}
                    >
                      {completed ? 'Review' : 'Start'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderLesson = () => {
    const renderLessonContent = (lesson) => {
      const parts = [];
      const regex = /\[IMAGE:([^\]]+)\]/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(lesson.content)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', value: lesson.content.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'image', id: match[1] });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < lesson.content.length) {
        parts.push({ type: 'text', value: lesson.content.slice(lastIndex) });
      }

      return parts;
    };

    return (
      <div className={`app-shell ${themeClass}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-2 text-tertiary mb-6">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentView('home')} className="hover:text-primary transition">
                <Home className="w-5 h-5" />
              </button>
              <span>/</span>
              <button onClick={() => setCurrentView('section')} className="hover:text-primary transition">
                {curriculum[currentSection].title}
              </button>
              <span>/</span>
              <span className="text-primary">{currentLesson.title}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="card p-2 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className={`w-5 h-5 ${accentText}`} />}
            </button>
          </div>

          <div className="card rounded-2xl p-8 mb-6 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6">{currentLesson.title}</h1>
            
            <div className="prose prose-invert max-w-none space-y-6">
              {renderLessonContent(currentLesson).map((block, idx) => {
                if (block.type === 'image') {
                  const imgSrc = lessonImages[block.id];
                  if (!imgSrc) return null;
                  const sizeClass = block.id === 'communication' ? 'max-w-[200px]' : 'max-w-[240px]';
                  return (
                    <div key={`img-${idx}`} className="flex justify-center">
                      <img
                        src={imgSrc}
                        alt={`Diagram for ${currentLesson.title}`}
                        className={`w-full ${sizeClass} rounded-xl border border-theme shadow-lg`}
                      />
                    </div>
                  );
                }
                return (
                  <pre
                    key={`text-${idx}`}
                    className="whitespace-pre-wrap font-mono text-sm code-block p-6 rounded-lg overflow-x-auto"
                  >
                    {block.value}
                  </pre>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                completeLesson(currentLesson.id);
                const section = curriculum[currentSection];
                const currentIndex = section.lessons.findIndex(l => l.id === currentLesson.id);
                if (currentIndex < section.lessons.length - 1) {
                  setCurrentLesson(section.lessons[currentIndex + 1]);
                } else {
                  setCurrentView('section');
                }
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4 rounded-xl font-bold text-lg hover:from-green-500 hover:to-teal-500 transition shadow-lg"
            >
              Complete & Continue
            </button>

            {currentLesson.hasQuiz && (
              <button
                onClick={() => startQuiz(currentLesson)}
                className={`flex-1 bg-gradient-to-r ${primaryGradientReverse} px-6 py-4 rounded-xl font-bold text-lg ${primaryHoverGradientReverse} transition shadow-lg flex items-center justify-center gap-2`}
              >
                <Brain className="w-6 h-6" />
                Take Quiz
              </button>
            )}

            {currentLesson.hasChallenge && (
              <button
                onClick={() => startChallenge(currentLesson)}
                className={`flex-1 bg-gradient-to-r ${accentGradient} px-6 py-4 rounded-xl font-bold text-lg ${accentHoverGradient} transition shadow-lg flex items-center justify-center gap-2`}
              >
                <Code className="w-6 h-6" />
                Try Challenge
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (quizState.showResults) {
      const percentage = Math.round((quizState.score / quizState.lesson.quiz.questions.length) * 100);
      
      return (
        <div className={`app-shell ${themeClass}`}>
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="card p-3 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className={`w-5 h-5 ${accentText}`} />}
              </button>
            </div>
            <div className="card rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-7xl mb-4">
                  {percentage === 100 ? '🏆' : percentage >= 70 ? '🎉' : '📚'}
                </div>
                <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {percentage}%
                </div>
                <p className="text-xl text-secondary">
                  {quizState.score} out of {quizState.lesson.quiz.questions.length} correct
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {quizState.lesson.quiz.questions.map((q, idx) => {
                  const userAnswer = quizState.answers[idx];
                  return (
                    <div key={idx} className="code-block rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {userAnswer.correct ? (
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <div className="w-6 h-6 text-red-400 flex-shrink-0 mt-1">✗</div>
                        )}
                        <div className="flex-1">
                          <p className="font-bold mb-2">{q.q}</p>
                          <p className="text-sm text-tertiary mb-2">
                            Your answer: {q.options[userAnswer.answer]}
                          </p>
                          {!userAnswer.correct && (
                            <p className="text-sm text-green-400 mb-2">
                              Correct answer: {q.options[q.correct]}
                            </p>
                          )}
                          <p className="text-sm text-secondary italic">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setQuizState(null);
                    setCurrentView('lesson');
                  }}
                  className={`flex-1 bg-gradient-to-r ${primaryGradientReverse} px-6 py-3 rounded-lg font-bold ${primaryHoverGradientReverse} transition`}
                >
                  Back to Lesson
                </button>
                <button
                  onClick={() => startQuiz(quizState.lesson)}
                  className={`flex-1 bg-gradient-to-r ${accentGradient} px-6 py-3 rounded-lg font-bold ${accentHoverGradient} transition`}
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const question = quizState.lesson.quiz.questions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / quizState.lesson.quiz.questions.length) * 100;

    return (
      <div className={`app-shell ${themeClass}`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="card p-3 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className={`w-5 h-5 ${accentText}`} />}
            </button>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-tertiary mb-2">
              <span>Question {quizState.currentQuestion + 1} of {quizState.lesson.quiz.questions.length}</span>
              <span>Score: {quizState.score}/{quizState.currentQuestion}</span>
            </div>
            <div className="progress-bg rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="card rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{question.q}</h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => answerQuestion(idx)}
                  className="w-full text-left code-block card-hover p-4 rounded-lg transition border-2 border-theme hover:border-cyan-500"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${primaryGradient} flex items-center justify-center font-bold flex-shrink-0`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChallenge = () => {
    const storageKey = storageKeyForLesson(challengeState.lesson.id);

    // Patch-update the diagram so individual class objects are never replaced wholesale.
    const updateDiagram = (mutator) => {
      setChallengeState(prev => {
        const nextDiagram = typeof mutator === 'function' ? mutator(prev.diagram) : mutator;
        const nextSolution = generateSolutionFromDiagram(nextDiagram);
        const nextState = {
          ...prev,
          diagram: nextDiagram,
          userSolution: nextSolution
        };
        try {
          localStorage.setItem(storageKey, JSON.stringify(nextDiagram));
        } catch (e) {
          // ignore storage errors
        }
        return nextState;
      });
    };

    const readiness = buildReadiness(challengeState.diagram, challengeState.lesson.challenge.scenario);
    const readyToSubmit = readiness.classesOk && readiness.relationshipsOk && readiness.requiredOk;

    const edgeTypeLabels = {
      association: 'Association',
      aggregation: 'Aggregation',
      composition: 'Composition',
      inheritance: 'Inheritance',
      realization: 'Realization'
    };

    const selectedClass = challengeState.diagram.classes.find(c => c.id === challengeState.selectedClassId) || null;

    const selectClass = (classId) => {
      const cls = challengeState.diagram.classes.find(c => c.id === classId);
      setChallengeState(prev => ({
        ...prev,
        selectedClassId: classId,
        nodeEditor: cls
          ? {
              title: cls.name || '',
              attributesText: (cls.attributes || []).join('\n'),
              methodsText: (cls.methods || []).join('\n')
            }
          : prev.nodeEditor
      }));
    };

    const updateClassName = (classId, name) => {
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls => cls.id === classId ? { ...cls, name } : cls)
      }));
    };

    const addAttribute = (classId, value) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls =>
          cls.id === classId ? { ...cls, attributes: [...cls.attributes, trimmed] } : cls
        )
      }));
      setClassFormInputs(prev => ({ ...prev, [classId]: { ...(prev[classId] || {}), attr: '' } }));
    };

    const removeAttribute = (classId, idx) => {
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls =>
          cls.id === classId
            ? { ...cls, attributes: cls.attributes.filter((_, i) => i !== idx) }
            : cls
        )
      }));
    };

    const addMethod = (classId, value) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls =>
          cls.id === classId ? { ...cls, methods: [...cls.methods, trimmed] } : cls
        )
      }));
      setClassFormInputs(prev => ({ ...prev, [classId]: { ...(prev[classId] || {}), method: '' } }));
    };

    const removeMethod = (classId, idx) => {
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls =>
          cls.id === classId
            ? { ...cls, methods: cls.methods.filter((_, i) => i !== idx) }
            : cls
        )
      }));
    };

    const addRelationship = (fromId, type, toId, label) => {
      if (!fromId || !toId || fromId === toId) return;
      updateDiagram(diagram => ({
        ...diagram,
        relationships: [
          ...diagram.relationships,
          { id: `r${Date.now()}`, fromId, toId, type, label: label.trim() }
        ]
      }));
      setRelationshipForm(prev => ({ ...prev, label: '' }));
    };

    const removeRelationship = (relId) => {
      updateDiagram(diagram => ({
        ...diagram,
        relationships: diagram.relationships.filter(r => r.id !== relId)
      }));
    };

    const saveNodeEdits = () => {
      if (!selectedClass) return;
      const { title, attributesText, methodsText } = challengeState.nodeEditor;
      // Patch only the selected class so other class details stay intact.
      updateDiagram(diagram => ({
        ...diagram,
        classes: diagram.classes.map(cls =>
          cls.id === selectedClass.id
            ? {
                ...cls,
                name: title || cls.name,
                attributes: attributesText.split('\n').map(s => s.trim()).filter(Boolean),
                methods: methodsText.split('\n').map(s => s.trim()).filter(Boolean)
              }
            : cls
        )
      }));
    };

    const clearDiagram = () => {
      if (!confirm('Clear the diagram?')) return;
      const fresh = createTemplateDiagram(challengeState.lesson);
      updateDiagram(fresh);
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        // ignore
      }
      setClassFormInputs({});
      const firstId = fresh.classes[0]?.id || '';
      const secondId = fresh.classes[1]?.id || firstId;
      setRelationshipForm({ fromId: firstId, toId: secondId, type: 'association', label: '' });
      setChallengeState(prev => ({
        ...prev,
        selectedClassId: fresh.classes[0]?.id || null,
        nodeEditor: {
          title: fresh.classes[0]?.name || '',
          attributesText: '',
          methodsText: ''
        }
      }));
    };

    const layoutClasses = (classes) => {
      const positions = {};
      const cols = 3;
      const w = 220;
      const h = 140;
      const gapX = 40;
      const gapY = 40;
      const margin = 20;
      classes.forEach((cls, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        positions[cls.id] = {
          x: margin + col * (w + gapX),
          y: margin + row * (h + gapY),
          w,
          h
        };
      });
      const totalRows = Math.max(1, Math.ceil(classes.length / cols));
      const width = margin * 2 + cols * w + (cols - 1) * gapX;
      const height = margin * 2 + totalRows * h + (totalRows - 1) * gapY;
      return { positions, width, height };
    };

    const { positions, width: canvasWidth, height: canvasHeight } = layoutClasses(challengeState.diagram.classes);

    return (
      <div className={`app-shell ${themeClass}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => {
                setChallengeState(null);
                setCurrentView('lesson');
              }}
              className="flex items-center gap-2 text-secondary hover:text-primary transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Lesson
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="card p-3 rounded-full border-theme border-2 hover:scale-110 transition shadow-lg"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className={`w-5 h-5 ${accentText}`} />}
            </button>
          </div>

          <div className="card rounded-2xl p-8 mb-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Code className={`w-8 h-8 ${accentText}`} />
              <h1 className="text-3xl font-bold">{challengeState.lesson.challenge.title}</h1>
            </div>
            <p className="text-secondary text-lg mb-4">{challengeState.lesson.challenge.description}</p>
            
            <div className="code-block rounded-lg p-6 mb-4">
              <h3 className="font-bold mb-3 text-cyan-400">Scenario:</h3>
              <pre className="whitespace-pre-wrap text-sm text-secondary">{challengeState.lesson.challenge.scenario}</pre>
            </div>

            {challengeState.hintsUsed < challengeState.lesson.challenge.hints.length && (
              <button
                onClick={() => setChallengeState({ ...challengeState, hintsUsed: challengeState.hintsUsed + 1 })}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-500 transition mb-4"
              >
                Show Hint ({challengeState.hintsUsed + 1}/{challengeState.lesson.challenge.hints.length})
              </button>
            )}

            {challengeState.hintsUsed > 0 && (
              <div className="space-y-2 mb-4">
                {challengeState.lesson.challenge.hints.slice(0, challengeState.hintsUsed).map((hint, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-yellow-900/30 border-yellow-600/50' : 'bg-yellow-100 border-yellow-400'} border rounded-lg p-3`}>
                    <span className="font-bold text-yellow-400">Hint {idx + 1}:</span> {hint}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card rounded-2xl p-6 shadow-2xl mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                onClick={clearDiagram}
                className="px-3 py-2 rounded-lg border border-theme text-sm text-secondary hover:text-primary"
              >
                Clear Diagram
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {challengeState.diagram.classes.map(cls => {
                const inputs = classFormInputs[cls.id] || { attr: '', method: '' };
                return (
                  <div key={cls.id} className={`card border rounded-xl p-4 space-y-3 ${challengeState.selectedClassId === cls.id ? 'ring-2 ring-cyan-500' : ''}`}>
                    <div className="flex justify-between items-center">
                      <input
                        className="input-field w-full px-3 py-2 rounded border"
                        value={cls.name}
                        onChange={(e) => updateClassName(cls.id, e.target.value)}
                        onFocus={() => selectClass(cls.id)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-tertiary uppercase tracking-wide">Attributes</span>
                      </div>
                      <div className="space-y-1">
                        {cls.attributes.map((attr, idx) => (
                          <div key={`${cls.id}-attr-${idx}`} className="flex items-center gap-2 text-sm">
                            <span className="flex-1 text-secondary">{attr}</span>
                            <button
                              onClick={() => removeAttribute(cls.id, idx)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <input
                          className="input-field flex-1 px-2 py-1 rounded border text-sm"
                          placeholder="+ attribute"
                          value={inputs.attr || ''}
                          onChange={(e) => setClassFormInputs(prev => ({ ...prev, [cls.id]: { ...(prev[cls.id] || {}), attr: e.target.value } }))}
                          onFocus={() => selectClass(cls.id)}
                        />
                        <button
                          onClick={() => { addAttribute(cls.id, inputs.attr || ''); }}
                          className="text-xs px-3 py-1 rounded bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-tertiary uppercase tracking-wide">Methods</span>
                      </div>
                      <div className="space-y-1">
                        {cls.methods.map((method, idx) => (
                          <div key={`${cls.id}-method-${idx}`} className="flex items-center gap-2 text-sm">
                            <span className="flex-1 text-secondary">{method}</span>
                            <button
                              onClick={() => removeMethod(cls.id, idx)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <input
                          className="input-field flex-1 px-2 py-1 rounded border text-sm"
                          placeholder="+ method"
                          value={inputs.method || ''}
                          onChange={(e) => setClassFormInputs(prev => ({ ...prev, [cls.id]: { ...(prev[cls.id] || {}), method: e.target.value } }))}
                          onFocus={() => selectClass(cls.id)}
                        />
                        <button
                          onClick={() => { addMethod(cls.id, inputs.method || ''); }}
                          className="text-xs px-3 py-1 rounded bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => selectClass(cls.id)}
                      className="w-full text-xs mt-2 py-2 rounded border border-theme text-secondary hover:text-primary"
                    >
                      Edit in Side Panel
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="card border rounded-xl p-4 space-y-3 lg:col-span-2">
                <h4 className="font-bold text-secondary">Relationships</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <select
                    className="input-field border px-3 py-2 rounded text-sm"
                    value={relationshipForm.fromId || challengeState.diagram.classes[0]?.id || ''}
                    onChange={(e) => setRelationshipForm(prev => ({ ...prev, fromId: e.target.value }))}
                  >
                    {challengeState.diagram.classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                  <select
                    className="input-field border px-3 py-2 rounded text-sm"
                    value={relationshipForm.type}
                    onChange={(e) => setRelationshipForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    {Object.keys(edgeTypeLabels).map(type => (
                      <option key={type} value={type}>{edgeTypeLabels[type]}</option>
                    ))}
                  </select>
                  <select
                    className="input-field border px-3 py-2 rounded text-sm"
                    value={relationshipForm.toId || challengeState.diagram.classes[1]?.id || ''}
                    onChange={(e) => setRelationshipForm(prev => ({ ...prev, toId: e.target.value }))}
                  >
                    {challengeState.diagram.classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                  <input
                    className="input-field border px-3 py-2 rounded text-sm"
                    placeholder="Label (optional)"
                    value={relationshipForm.label}
                    onChange={(e) => setRelationshipForm(prev => ({ ...prev, label: e.target.value }))}
                  />
                </div>
                <button
                  onClick={() => addRelationship(
                    relationshipForm.fromId || challengeState.diagram.classes[0]?.id || '',
                    relationshipForm.type,
                    relationshipForm.toId || challengeState.diagram.classes[1]?.id || '',
                    relationshipForm.label || ''
                  )}
                  className="mt-3 bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:from-cyan-500 hover:to-blue-500"
                >
                  Add Relationship
                </button>

                <div className="mt-4 space-y-2">
                  {challengeState.diagram.relationships.map(rel => (
                    <div key={rel.id} className="flex items-center gap-2 text-sm text-secondary">
                      <span className="flex-1">
                        {challengeState.diagram.classes.find(c => c.id === rel.fromId)?.name || rel.fromId}
                        {' '}
                        --{rel.type}{rel.label ? `(${rel.label})` : ''}--> {' '}
                        {challengeState.diagram.classes.find(c => c.id === rel.toId)?.name || rel.toId}
                      </span>
                      <button
                        onClick={() => removeRelationship(rel.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card border rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-secondary">Side Panel Editor</h4>
                {selectedClass ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-tertiary">Title</label>
                      <input
                        className="input-field w-full px-3 py-2 rounded border mt-1"
                        value={challengeState.nodeEditor.title}
                        onChange={(e) => setChallengeState(prev => ({
                          ...prev,
                          nodeEditor: { ...prev.nodeEditor, title: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-tertiary">Attributes (one per line)</label>
                      <textarea
                        className="input-field w-full px-3 py-2 rounded border mt-1 h-20"
                        value={challengeState.nodeEditor.attributesText}
                        onChange={(e) => setChallengeState(prev => ({
                          ...prev,
                          nodeEditor: { ...prev.nodeEditor, attributesText: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-tertiary">Methods (one per line)</label>
                      <textarea
                        className="input-field w-full px-3 py-2 rounded border mt-1 h-20"
                        value={challengeState.nodeEditor.methodsText}
                        onChange={(e) => setChallengeState(prev => ({
                          ...prev,
                          nodeEditor: { ...prev.nodeEditor, methodsText: e.target.value }
                        }))}
                      />
                    </div>
                    <button
                      onClick={() => {
                        saveNodeEdits();
                        setClassFormInputs(prev => ({ ...prev, [selectedClass.id]: { attr: '', method: '' } }));
                      }}
                      className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2 rounded-lg font-bold hover:from-green-500 hover:to-teal-500 transition"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-tertiary">Select a class card to edit.</p>
                )}
              </div>
            </div>

            <div className="card rounded-xl border border-theme p-4 shadow-lg">
              <h4 className="font-bold text-secondary mb-2">Visual Preview</h4>
              <div className="rounded-xl border border-theme bg-gradient-to-br from-slate-800/10 to-slate-900/10 overflow-hidden">
                <svg width="100%" height={canvasHeight} viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
                      <path d="M0,0 L10,3 L0,6 z" fill="#38bdf8" />
                    </marker>
                    <marker id="triangle" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
                      <path d="M0,0 L12,6 L0,12 z" fill="white" stroke="#38bdf8" strokeWidth="1.5" />
                    </marker>
                    <marker id="diamond" markerWidth="16" markerHeight="16" refX="16" refY="8" orient="auto">
                      <path d="M0,8 L8,0 L16,8 L8,16 z" fill="white" stroke="#38bdf8" strokeWidth="1.5" />
                    </marker>
                    <marker id="diamond-filled" markerWidth="16" markerHeight="16" refX="16" refY="8" orient="auto">
                      <path d="M0,8 L8,0 L16,8 L8,16 z" fill="#38bdf8" />
                    </marker>
                  </defs>

                  {challengeState.diagram.relationships.map(rel => {
                    const fromPos = positions[rel.fromId];
                    const toPos = positions[rel.toId];
                    if (!fromPos || !toPos) return null;
                    const x1 = fromPos.x + fromPos.w / 2;
                    const y1 = fromPos.y + fromPos.h / 2;
                    const x2 = toPos.x + toPos.w / 2;
                    const y2 = toPos.y + toPos.h / 2;

                    let markerEnd = 'url(#arrow)';
                    let markerStart = null;
                    const isDashed = rel.type === 'realization';

                    if (rel.type === 'inheritance' || rel.type === 'realization') {
                      markerEnd = 'url(#triangle)';
                    } else if (rel.type === 'aggregation') {
                      markerStart = 'url(#diamond)';
                    } else if (rel.type === 'composition') {
                      markerStart = 'url(#diamond-filled)';
                    }

                    return (
                      <g key={rel.id}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeDasharray={isDashed ? '6 4' : '0'}
                          markerEnd={markerEnd}
                          markerStart={markerStart}
                        />
                        {rel.label && (
                          <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} fill="#38bdf8" fontSize="12" textAnchor="middle">
                            {rel.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {challengeState.diagram.classes.map(cls => {
                    const pos = positions[cls.id];
                    if (!pos) return null;
                    return (
                      <g key={cls.id} transform={`translate(${pos.x}, ${pos.y})`}>
                        <rect
                          width={pos.w}
                          height={pos.h}
                          rx="6"
                          ry="6"
                          fill="#111827"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          opacity="0.95"
                        />
                        <rect width={pos.w} height="28" rx="6" ry="6" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="10" y={18} fill="white" fontSize="14" fontWeight="700">
                          {cls.name || 'Class'}
                        </text>
                        <line x1="0" y1="40" x2={pos.w} y2="40" stroke="#1f2937" />

                        <text x="10" y="56" fill="#e5e7eb" fontSize="12">
                          {(cls.attributes && cls.attributes.length ? cls.attributes : ['']).map((line, idx) => (
                            <tspan key={idx} x="10" dy={idx === 0 ? 0 : 14}>{line}</tspan>
                          ))}
                        </text>
                        <line x1="0" y1={pos.h - 40} x2={pos.w} y2={pos.h - 40} stroke="#1f2937" />
                        <text x="10" y={pos.h - 22} fill="#e5e7eb" fontSize="12">
                          {(cls.methods && cls.methods.length ? cls.methods : ['']).map((line, idx) => (
                            <tspan key={idx} x="10" dy={idx === 0 ? 0 : 14}>{line}</tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <span className="text-sm font-semibold text-secondary">Readiness:</span>
              <span className={`text-xs px-2 py-1 rounded ${readiness.classesOk ? 'bg-green-600' : 'bg-slate-600'}`}>≥ 3 classes</span>
              <span className={`text-xs px-2 py-1 rounded ${readiness.relationshipsOk ? 'bg-green-600' : 'bg-slate-600'}`}>≥ 1 relationship</span>
              <span className={`text-xs px-2 py-1 rounded ${readiness.requiredOk ? 'bg-green-600' : 'bg-slate-600'}`}>Scenario classes present</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold mb-4 text-xl">Submit</h3>
              <pre className="code-block text-xs p-3 rounded-lg h-48 overflow-y-auto mb-4">{challengeState.userSolution}</pre>
              <div className="flex gap-4">
                <button
                  onClick={submitChallenge}
                  disabled={!readyToSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 px-6 py-3 rounded-lg font-bold hover:from-green-500 hover:to-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Solution
                </button>
                <button
                  onClick={() => setChallengeState(prev => ({ ...prev, showSolution: !prev.showSolution }))}
                  className={`flex-1 bg-gradient-to-r ${primaryGradientReverse} px-6 py-3 rounded-lg font-bold ${primaryHoverGradientReverse} transition`}
                >
                  {challengeState.showSolution ? 'Hide' : 'Show'} Reference
                </button>
              </div>
              {challengeState.feedback && (
                <div className="mt-3 text-sm text-yellow-500">
                  {challengeState.feedback}
                </div>
              )}
            </div>

            {challengeState.showSolution && (
              <div className="card rounded-2xl p-6 shadow-2xl">
                <h3 className="font-bold mb-4 text-xl text-cyan-400">Reference Solution</h3>
                <pre className="code-block text-cyan-300 font-mono text-sm p-4 rounded-lg overflow-x-auto h-96">
                  {challengeState.lesson.challenge.solution}
                </pre>
                <p className="mt-4 text-sm text-tertiary italic">
                  Note: This is one possible solution. Your approach may differ and still be correct!
                </p>
              </div>
            )}
          </div>

          {challengeState.submitted && (
            <div className="mt-6 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Challenge Submitted!</h3>
                  <p className="text-lg">
                    Great work! Compare your solution with the reference to see different approaches.
                    {challengeState.hintsUsed === 0 && " Bonus points for completing without hints!"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'home' && renderHome()}
      {currentView === 'section' && renderSection()}
      {currentView === 'lesson' && renderLesson()}
      {currentView === 'quiz' && renderQuiz()}
      {currentView === 'challenge' && renderChallenge()}
    </div>
  );
};

export default UMLTutor;
