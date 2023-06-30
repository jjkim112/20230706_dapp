"use client";

import { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "./layout";

const Home: NextPage = () => {
  const { account } = useContext(AppContext);

  return (
    <main className="px-8 pt-16">
      {account ? account : "로그인 전"}
      <div>
        dotenv는 애플리케이션의 환경 변수를 관리하기 위한 파일 형식 및
        라이브러리입니다.
        <br /> 환경 변수는 애플리케이션의 동작을 제어하는 구성 요소입니다.
        <br /> dotenv 파일은 애플리케이션의 설정을 정의하는데 사용되며,
        일반적으로 프로젝트 루트 디렉토리에 .env라는 이름으로 저장됩니다.
      </div>
      <div className="mt-8">
        dotenv 파일은 키-값 쌍으로 구성되어 있으며, 각 키-값 쌍은 환경 변수의
        이름과 해당 값을 정의합니다.
        <br /> 애플리케이션은 dotenv 파일을 로드하여 환경 변수를 읽고, 이를
        사용하여 실행 시간에 동작을 조정할 수 있습니다.
        <br /> 예를 들어, 데이터베이스 연결 정보, API 토큰, 포트 번호 등을
        dotenv 파일에 정의하고 애플리케이션에서 해당 값을 사용할 수 있습니다.
      </div>
      <div className="mt-8">
        dotenv는 주로 웹 개발에서 사용되며, 애플리케이션의 설정을 관리하고
        다양한 환경(로컬 개발, 개발 서버, 프로덕션 서버 등) 간에 일관성을
        유지하는 데 도움을 줍니다.
        <br /> dotenv 라이브러리는 다양한 프로그래밍 언어에 대해 제공되며, 해당
        언어에서 환경 변수를 로드하고 읽을 수 있는 방법을 제공합니다.
      </div>
    </main>
  );
};

export default Home;
