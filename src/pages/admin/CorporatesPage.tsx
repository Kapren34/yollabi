import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const mockCorporates = [
  { id: 1, name: 'ABC Teknoloji', email: 'info@abc.com', phone: '212-1234', created: '2022-12-01' },
  { id: 2, name: 'XYZ Yazılım', email: 'iletisim@xyz.com', phone: '312-5678', created: '2023-01-20' },
];

const CorporatesPage: React.FC = () => {
  const [data, setData] = useState(mockCorporates);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const handleDelete = (id: number) => {
    setData(data.filter(c => c.id !== id));
  };
  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };
  const handleCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then(values => {
      if (editing) {
        setData(data.map(c => c.id === editing.id ? { ...editing, ...values } : c));
      } else {
        setData([...data, { ...values, id: Date.now(), created: new Date().toISOString().slice(0,10) }]);
      }
      setModalOpen(false);
    });
  };

  const columns = [
    { title: 'Şirket Adı', dataIndex: 'name', key: 'name' },
    { title: 'E-posta', dataIndex: 'email', key: 'email' },
    { title: 'Telefon', dataIndex: 'phone', key: 'phone' },
    { title: 'Oluşturulma', dataIndex: 'created', key: 'created' },
    {
      title: 'Aksiyonlar',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const filtered = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<PlusOutlined />} type="primary" onClick={handleCreate}>Hesap Oluştur</Button>
        <Input
          placeholder="Şirket ara"
          prefix={<SearchOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          allowClear
        />
      </Space>
      <Table rowKey="id" columns={columns} dataSource={filtered} pagination={{ pageSize: 8 }} />
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={handleOk} title={editing ? 'Hesap Düzenle' : 'Hesap Oluştur'}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Şirket Adı" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="E-posta" rules={[{ required: true, type: 'email', message: 'Geçerli e-posta girin' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: 'Zorunlu alan' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CorporatesPage; 