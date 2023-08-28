import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './pipeline-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('everythingparlays/TestWebsiteCDKCICD', 'main',{
            authentication: cdk.SecretValue.secretsManager('github-token', {jsonField:'github-token'})// Provide the GitHub token here
          }),
        commands: ['npm ci', 'npm run build', 'cdk synth']
      })
    });

    pipeline.addStage(new MyPipelineAppStage(this, "devStage",{...props, stageName: "dev"}));

    pipeline.addStage(new MyPipelineAppStage(this, "testStage",{...props, stageName: "test"}));

    pipeline.addStage(new MyPipelineAppStage(this, "prodStage",{...props, stageName: "prod"}));

  }
}