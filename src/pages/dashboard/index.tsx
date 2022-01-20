import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setCookie } from 'nookies';
import { Layout, Row, Col, Skeleton, Divider } from 'antd';
const { Footer } = Layout;
import { useSelector } from "react-redux";

import { fechtCatalogProductList } from '../../services/FetchFood/merchantCatalog';
import { fechtAuthenticationTokenCentralized } from '../../services/FetchFood/merchantAuthorization';
import withAuth from '../../utils/withAuth';
import LeftMenu from "../../components/left-menu/index";
/* import Header from "../../components/header"; */
import { HeaderAntd } from '../../components/headerAntd';

import { DivBody, DivFooter } from '../../../styles/dashboardCss';
import 'antd/dist/antd.css';

function Dashboard() {
  interface RootState {
    merchantOrder: {
      statusLoja: string
    }
  }

  const {Content} = Layout;
  const merchantOrder = (state: RootState) => state.merchantOrder;
  const isOn = useSelector(merchantOrder);
  console.log('isOn :', isOn);

  /* async function generateCode() {
    try {
      const { data } = await fechtAuthenticationTokenCentralized();
      setCookie(null, 'food.token', data.data.accessToken, {maxAge: 86400 * 7, path: '/'});
      const aux = await fechtCatalogProductList()
      console.log('aux :', aux.data);
    } catch (err) {
      console.log('errAuthCentrDash :', err.message);
    }
  } */

  const loadMoreData = () => {

  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {
        typeof  window  ! ==  'undefined' ? 'null' : <HeaderAntd />
      }
      <Layout>
        {
          typeof  window  ! ==  'undefined' ? 'null' : <LeftMenu />
        }
        <Layout>
          <Content>
            <Row wrap={false}>
              <Col flex="200px">
                <DivBody
                  id={"scrollableDiv"}
                  >
                  <InfiniteScroll
                    dataLength={10}
                    next={loadMoreData}
                    hasMore={10 < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    >
                    {/* {dataLog ?
                      dataLog.map((dados, index) => (
                        <button key={index}>{dados.id}</button>
                        ))
                      :
                      dataLog.map((dados, index) => (
                        <button key={index}>{dados.id}</button>
                        ))
                      } */}
                  </InfiniteScroll>
                </DivBody>
              </Col>
              <Col flex="auto" >
                <DivBody>
                  <div>
            
                  </div>
                </DivBody>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center', margin: "0px", padding: "0px", height: '70px'}}>
            <Row>
              <Col flex="200px">
                <DivFooter>
                  Relatorio do dia
                </DivFooter>
                <DivFooter>
                  Relatorio do dia
                </DivFooter>
              </Col>
              
              <Col flex="auto">Info importante: Dinheiro, Cartão, Observação</Col>
            </Row>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withAuth(Dashboard);
