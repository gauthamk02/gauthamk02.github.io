---
title: "Intro to Maths of Neural Networks"
date: 2023-09-04
draft: false
math: true
---

Deep Learning and AI have gained a lot of popularity because of the recent advancements in the field showing their capabilities for tasks like image detection, chat completion, image generation etc. At the base of all these models is Artifical Neural Networks(ANN). This article provides a basic understanding of maths and theoretical working of these networks.

Most of the maths present in this article comes under Linear Algebra and Calculus. Anyone who has done an undergrad course or two on these topics will be familiar with the concepts explained in the article.

## What is a Neural Network?

A neural network or an Artifical Neural Network is a collection of nodes that are arranged in layers in such a way that it loosely resembles the connections of neurons in a brain where each node represents a neuron. Neural Networks have an input layer, one or more hidden layers and an output layer. 

<center>
    <img src=images/simple-feed-forward-ann.png width=700>
    <figcaption><i>A simple feed forward ANN with an input layer, 3 hidden layers and an outpt layer</i></figcaption> <br>
</center>

In this article we will only be dealing with the most basic architecture of an ANN, i.e a feed-forward neural network. Every node in a layer of a feed-forward neural network is connected to all the nodes in the previous layer and the input data moves from one layer to the next one sequentially.


## Why Neural Networks work? Neural Networks as function approximators

Neural Networks are capable of approximating a function to any arbitrary precision. A function can be anything from calculating the probablity of rain given the weather data, identifying if the given picture is that of cat or a dog, or whats the next best move to play in chess.

This property of ANNs is supported by the *Universal Approximation Theorem*^[1] which states that a Neural Network with as small as one hidden layer can approximate a function to an arbitrary degree of precision provided sufficient number of nodes are present in the hidden layer. This theorem provided the mathematical foundation for why Neural Networks work.

However, the theorem only states that neural networks are capable of approximating functions. For the network to work properly for a given task, the neurons have to contain the correct weights which will be learned during the training process.

## Matrices and ANNs

Neural Networks in its most basic form can be represented as a collection of matrix operations and functions.

<center>
    <img src=images/single-layer-with-weights.png height=400>
</center>
<br>

Consider the above neural network with \\(n\\) input nodes and \\(m\\) nodes in the first layer. Each neuron in the first layer is connected to all the inputs nodes and each connection has a weight of their own. Therefore the output of the first neuron can be represented as:

$$
a_{1}^{(1)} = \sigma\left(w_{1,0}a_{1}^{(0)} + w_{1,1}a_{2}^{(0)} + \ldots + w_{1,n}a_{n}^{(0)} + b_1^{(0)}\right) \\
=\sigma\left(\sum_{i=1}^{n} w_{1,i}a_{i}^{(0)} + b_1^{(0)}\right)
$$

where \\(b_1^{(0)}\\) is the bias of the first neuron and \\(\sigma\\) is the activation function. We will come to activation functions and why they are necessary soon. Now let all the neurons in the first layer be represented by the column vector \\(a^{(1)}\\). Then \\(a^{(1)}\\) can be written as:

<center>
    <img src=images/matrix-equation.png width=600>
</center>
<br>

To simply it further,

$$
a^{(1)} = \sigma\left(\mathbf{W}^{(1)} a^{(0)}+\mathbf{b}^{(1)}\right),\quad \mathbf{W}^{(1)} \in \mathbb{R}^{m\times n}, \mathbf{b}^{(1)} \in \mathbb{R}^{m\times 1}
$$

\\(\mathbf{W}^{(1)}\\) is all the combined weight and \\(\mathbf{b}^{(1)}\\) is the combined biases of the first layer.

<center>
    <img src=images/simple-ann.png width=500>
</center>
<br>

Consider a simple ANN like the one given above. Mathematically it can be written as:

$$
\mathbf{F(X)} = \sigma\left(\mathbf{W}^{(3)}*\sigma\left(\mathbf{W}^{(2)}\*\sigma\left(\mathbf{W}^{(1)}\*\mathbf{X}^{(0)}+\mathbf{b}^{(1)}\right) + \mathbf{b}^{(2)}\right) + \mathbf{b}^{(3)}\right)
$$

## Activations and Non-Linearity

Contructing Neural Networks where the vaues of nodes are calculated using the weighted sum of values from the previous layer using matrix multiplications has a major draw-back. Weighted sum and matrix multplications are linear functions and a combination of linear functions would result in another linear function. This means that the neural network consisting multiple hidden layers is equivalent to shallow network having one hidden layer. Such a network can only learn a linear decision boundary. Activation functions allow the model input to be mapped to the output in non-linear ways. This is necessay for any network that has to deal with non trivial tasks.

A decision boundary is the line that separates the input values to dfferent output classes. A linear decision bondary would be a line in 2D and a hyperplane in 3D.

<center>
    <img src=images/linear-and-nonlinear-function-graph.png width=700>
</center>
<br>

Consider the above two graphs where \\(x_1\\) and \\(x_2\\) are the input data and red, blue are two different classes. On the graph on the left, the data is arranged in such a way that it can be separated by a stright line, i.e it is linearly separable. A model for classifying such data can be built without using activation functions and the model will learn a decision boundary similar to the one given in the graph. However, the Graph on the right consists of data-points that is arrranged in a non-linearly separable way. To make a model capable of classifying the points in this graph accurately, we will have to use activation functions. 

Still confused? Visit [Tensorflow Playground](https://playground.tensorflow.org/), select a non-linearly separable data and try to train the model using different activation functions. The linear activation function is an identity function \\(\sigma(x) = x\\) or any other linear function and wont allow the model to learn a non-linear decision boundary. The model will only be able to classify the non-linear data if a non-linear activation function is used.

There are different activation functions that are used for constructing ANNs. Most of the time all the hidden layers will have the same activation and output layer, a different one. Some of the common non-linear activation functions are:

1. **Sigmoid function**
    The sigmoid function \\(\sigma:\mathbb{R}\rightarrow[0, 1]\\) takes in a real numbered value and maps it to between 0 and 1 in such a way that \\(\lim_{x\to\infty} \sigma(x) = 1\\) and \\(\lim_{x\to-\infty} \sigma(x) = 0\\). The equation of Sigmoid funcion is 
    $$\sigma(x) = \frac{1}{1+ e^{-x}}$$
    
    Sigmmoid function is usually used in the output layer of classification models where you want to get the output as a probability value between 0 and 1. 
    <center>
        <img src=images/sigmoid.png width=300>
    </center>
    <br>
 
2. **Tanh**
    Also known as the hyperbolic tangent function, the function \\(\sigma:\mathbb{R}\rightarrow[-1, 1]\\) takes in real values and maps it to [-1, 1]. Its equation is given by
    $$\sigma(x) = \frac{e^{x}+e^{-x}}{e^{x}- e^{-x}}$$
    
    <center>
        <img src=images/tanh.png width=300>
    </center>
    <br>

3. **ReLU**
    ReLU function \\(\sigma:\mathbb{R}\rightarrow[0, \infty]\\) maps all the real numbers to between 0 to \\(\infty\\). ReLU can be written as
    $$\sigma(x) = max(0, x)$$

    <center>
        <img src=images/relu.png width=300>
    </center>
    <br>

## Errors and Cost Function
We've seen how ANNs are constructed and how data flows through them. However for a neural network to give the output we want, they have to be trained. Here are some notations which we will be using from now on to represent the training data and the output given by the neural network.

\\(\mathbf{X}\\) = Input data for training
\\(\mathbf{Y}\\) = True output value for input data
\\(\mathbf{\hat{Y}}\\) = Predicted output value for input data
\\(\mathbf{n}\\) = Number of samples of training data

\\(x_i,y_i,\hat{y}_i\\) are the \\(i^{th}\\) elements of \\(\mathbf{X}\\), \\(\mathbf{Y}\\) and \\(\mathbf{\hat{Y}}\\) respectively.

To train the model we calculate the error and try to minimize it by updating the values of the weights iteratively. Error represents by how much the output of the network deviates from the true value. The function used to calculate the error is called a *Cost function*. One of the popular cost functions used for training neural networks is *MSE* or *Mean Squared Error*. MSE is calculated as

$$
\mathbf{MSE} = \frac{(\mathbf{\hat{Y}} - \mathbf{Y})^2}{2n} = \frac{1}{2n}\sum_{i = 0}^n(\hat{y}_i - y_i)^2
$$

Some of the other cost functions used are Cross-Entropy, Binary Cross-Entropy, Intersection over Union etc.

## Backpropagation and Gradient Descent

### Backpropagation
Backprogation is calculating the gradient of the error with respect to the individual weights of the nodes. It is called backpropagation as it starts from the last layers and iteratively calculates the the gradients till the first layer. Back propagation along with gradient descent is used to update the weights of the neurons to train the model to reduce the error to a minimum.

<center>
    <img src=images/simple-ann.png width=500>
</center>
<br>

Consider the previously shown Neural Network. The MSE error of this network is given by
$$
\mathbf{Error(E)} = \frac{1}{2n}\sum_{i = 0}^n(\hat{y}_i - y_i)^2, \quad n=2
$$

and error due to the \\(i^{th}\\) output node can be written as
$$
\mathbf{E} = \frac{1}{2}(\hat{y}_i - y)^2
$$

To update the weights of the neurons we have to find the gradient of the error with respect to it which can be calculated using chain rule.
$$
\frac{\partial \mathbf{E}}{\partial w_{ij}^k} = \frac{\partial \mathbf{E}}{\partial o_j^k}\frac{\partial o_j^k}{\partial w_{ij}^k} \qquad (1)
$$

\\(o_j^k\\) is the summed input (\\(input * weights + bias\\)) of the \\(j^{th}\\) neuron in layer \\(k\\).

$$
\frac{\partial o_j^k}{\partial w_{ij}^k} = \frac{\partial \sum_{l=1}^{n}w_{lj}^k*a_l^{k-1} + b^k}{\partial w_{ij}^k} = a_i^{k-1}
$$

\\(\dfrac{\partial \mathbf{E}}{\partial o_j^k}\\) is called the error of \\(j^{th}\\) node at level \\(k\\) and is denoted by \\(\delta_j^k\\).

Therefore, Eq (1) can be written as \\(\dfrac{\partial \mathbf{E}}{\partial w_{ij}^k} = \delta_j^k*a_i^{k-1}\\)

The value \\(\delta_j^k\\) depends on whether if it belongs to an output node or a hidden node.


**For an output nodes:**
The error value of the nodes in the output layer can be calculated direclty by taking the derivative of the cost function with respect to the input of the node.

$$
\mathbf{E} = \dfrac{1}{2}(\hat{y} - y)^2 =\dfrac{1}{2}(\sigma(o_j) - y)^2 = \dfrac{1}{2}(a_j - y)^2
$$

So \\(\delta_j^k = \dfrac{\partial \mathbf{E}}{\partial o_j^k} = \dfrac{\partial \mathbf{E}}{\partial a_j}\dfrac{\partial a_j} {\partial o_j}=(a_j - y)\sigma'(o_j)\\)

**For hidden nodes:**
Unlike an output node, a hidden node's error term will be affected by all the nodes in the layer after it. As in it will be a weighted sum of all the errors of the nodes in the succeeding layer. We can use chain rule for multivariant functions for formulating the equation for finding the error of hidden nodes.

$$
\delta_j^k=\dfrac{\partial \mathbf{E}}{\partial o_j^k} 
= \sum_{l=1}^n \frac{\partial \mathbf{E}}{\partial o_l^{k + 1}}\frac{\partial o_l^{k + 1}}{\partial o_j^k} \\
= \sum_{l=1}^n \delta_l^{k+1}\frac{\partial o_j^{k + 1}}{\partial o_j^k}
$$

\\(o_j^{k + 1}\\) is given by \\(o_j^{k + 1} = \sum_{i=0}w_{ij}^{k+1}\sigma(o_{j}^k)\\)

Therefore,
$$
\frac{\partial o_j^{k + 1}}{\partial o_j^k} = w_{ij}^{k+1}\sigma'(o_{j}^k)
$$

Combining them \\(\delta_j^k\\) can be written as,
$$
\delta_j^k=\sum_{l=1}^n \delta_l^{k+1}w_{lj}^{k+1}\sigma'(o_{j}^k) \\
= \sigma'(o_{j}^k)\sum_{l=1}^n \delta_l^{k+1}w_{lj}^{k+1}
$$

Using all the above equations, the general formula for \\(\dfrac{\partial \mathbf{E}}{\partial w_{ij}^k}\\)is

<!-- $$
\usepackage{amsmath}
\frac{\partial \mathbf{E}}{\partial w_{ij}^k} = 
\begin{cases}
(\hat{y} - y)\sigma'(o_j)a_i^{k-1},& \text{for output nodes} \\
\sigma'(o_{j}^k)a_i^{k-1}\sum_{l=1}^n \delta_l^{k+1}w_{lj}^{k+1},& \text{for hidden nodes}
\end{cases}
$$ -->
<center>
    <img src=images/backpropagation-full-equation.png width=500>
</center>

It can be seen that computing the value of \\(\delta_l^{k}\\) depends on the errors of the succeeding nodes, the computed values are cached and reused as the compuation of gradients start from the output layers and proceed to the initial layers.

> Backpropagation is the most of math intensive and confusing part for simple ANN's such as the ones discussed here. A lot of inspiration on formulating the equations and ordering them was taken from the well written blog [Backpropagation by John McGonagle, George Shaikouski, Christopher Williams, and 3 others](https://brilliant.org/wiki/backpropagation/) present at [Brilliant](https://brilliant.org/).

### Gradient Descent

Gradient descent is a first-order iterative optimisation algorithm that is commonly used for training machine learning models. The algorithm can be used for finding the local minima of a differentiable function --- a cost function in the case of machine learning models.

<center>
    <img src=images/gradient-descent.png width=300>
    <figcaption><i>Gradient descent on a simple convex function</i></figcaption>
</center>
<br>

Gradient descent works by calculating the gradients of the output of the function to minimise with respect to its parameters. The parameter is then updated in the direction opposite of that of the calculated gradient after multiplying it by a constant called the learning rate(\\(\eta\\)). By doing this multiple times, the parameters of the function will have values that will reduce its output to a local minimum.

$$
x_{n+1} = x_n - \eta\nabla F
$$

It is necessary to choose an appropriate learning rate as a learning rate that is too large would cause divergence, where the model over shoots the minima. On the othe hand, a learning rate that is too small would be slow to converge.

For ANN, we can write the gradient descent algorithm as,
$$
w_{n+1} = w_n - \eta\frac{\partial \mathbf{E}}{\partial w_{n}}
$$

In the case of Machine Learning models like Linear Regression, the cost function MSE is a convex function and Gradient descent is guaranteed to find the optimal solution, i.e the global minima, provided a reasonably good learning rate is used. However, in the case of ANNs the cost function MSE is not convex and wll have many local minima to which gradient descent will move to depends on factors like weights initialisation and learning rate.

## Training ANNs
Keeping the theoretical part aside, many other factors also come into consideration when training an ANN. Such as quality of the dataset, choosing the right model architecture and hyperparameters, the training cost and time etc. Assuming all these factors are accounted for, the steps for training a neural network using a modern Deep Learning framework such as [PyTorch](https://pytorch.org/) or [Tensorflow](https://www.tensorflow.org/) will be as given below:

1. Load the data - The data along with the labels for training the modelis loaded
2. Forward pass - The data is passed through the model and output is stored
3. Calculating Loss - The output is compared with the true labels using cost function and the loss or error is calculated
4. Backpropagation - The gradient of all the nodes is calculated using backpropagation
5. Gradient Descent - The weights are updated using Gradient Descent algorithm

These steps will be repeated for a predefned number of times or until convergence.

## References

[1] Hornik, K., Stinchcombe, M. and White, H. (1989) ‘Multilayer feedforward networks are universal approximators’, Neural Networks, 2(5), pp. 359–366. Available at: https://doi.org/10.1016/0893-6080(89)90020-8.
