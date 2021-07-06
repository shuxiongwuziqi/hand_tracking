import * as tf from '@tensorflow/tfjs-core';
import * as tflayers from '@tensorflow/tfjs-layers';
import * as tfvis from '@tensorflow/tfjs-vis'

async function getData() {
  const selectedFile = document.getElementById("files").files[0];//获取读取的File对象
  const reader = new FileReader();
  reader.readAsText(selectedFile);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      resolve(data);
    }
  })
}

function preproccess(data) {
  // 1. 打乱数据的顺序  
  tf.util.shuffle(data);

  // 2. 把数据转换成张量
  const inputs = data.map(d => d.x);
  const labels = data.map(d => d.y === "a" ? -1 : 1);

  const inputTensor = tf.tensor2d(inputs, [inputs.length, 42]);
  const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

  // 3. 归一化， 在collectPose时已经做了。

  return { inputs: inputTensor, labels: labelTensor };
}

function createModel() {
  // Create a sequential model
  const model = tflayers.sequential();

  // Add a single input layer
  model.add(tflayers.layers.dense({ inputShape: [42], units: 128 }));

  // Add an output layer
  model.add(tflayers.layers.dense({ units: 1 }));

  return model;
}

async function trainModel(model, inputs, labels) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });

  const batchSize = 32;
  const epochs = 20;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'],
      { height: 200, callbacks: ['onEpochEnd'] }
    ),
  });
}

export async function trainHandPose() {
  // 从json文件中读取数据
  const { train: data } = await getData();

  // 创建模型
  const model = createModel();
  tfvis.show.modelSummary({ name: 'Model Summary' }, model);

  // 数据预处理
  const { inputs, labels } = preproccess(data);

  // 训练模型
  await trainModel(model, inputs, labels);

  // 保存模型
  const saveResult = await model.save('localstorage://my-model');
  console.log("模型保存成功");
}