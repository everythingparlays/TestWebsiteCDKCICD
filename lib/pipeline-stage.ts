import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { FargateDemoStack } from './fargate';
import { CloudfrontDemoStack } from './cloudfront';


export class MyPipelineAppStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      new FargateDemoStack(this, 'AppFrontendCdkStack',{...props});
      
      new CloudfrontDemoStack(this, "CloudfrontDemoStack", {...props});
    }
}