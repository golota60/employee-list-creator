import React, { useState } from 'react';
import './CreateListPage.scss';
import MainPageWrapper from '../MainPageWrapper';
import { Form, Input, Radio, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextWrapper from '../generic/TextWrapper';
import { createList } from '../../utils/fetches';
import { Store } from 'antd/lib/form/interface';

const CreateListPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  interface FormHandlerEventInterface {
    listName: string;
    teamSize: number;
  }

  async function finishHandle(e: Store) {
    setLoading(true);
    const response = await createList(e.listName, e.teamSize);
    const jsonResponse = await response.json();
    response.status === 400 ? setError(jsonResponse.message) : '';
    setLoading(false);
  }

  return (
    <MainPageWrapper>
      <div className="create-list-page">
        <div className="form-wrapper">
          <Form onFinish={finishHandle} className="create-list-form">
            <Form.Item
              label="List Name"
              name="listName"
              rules={[{ required: true, message: 'List Name is required' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Team Size"
              name="teamSize"
              rules={[{ required: true, message: 'Team Size is required' }]}
            >
              <Radio.Group>
                <Radio.Button value={2}>2</Radio.Button>
                <Radio.Button value={3}>3</Radio.Button>
                <Radio.Button value={4}>4</Radio.Button>
                <Radio.Button value={5}>5</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <div className="button-container">
              <Link to="/home">
                <Button>
                  <TextWrapper textType="h5" color="gray">
                    Go Back
                  </TextWrapper>
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
                disabled={isLoading}
              >
                <TextWrapper textType="h5" color="white">
                  Create List
                </TextWrapper>
              </Button>
            </div>
            {error !== '' ? (
              <TextWrapper
                textType="h5"
                className="ant-alert-error backend-error"
                color="red"
              >
                {error}
              </TextWrapper>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </div>
    </MainPageWrapper>
  );
};

export default CreateListPage;
